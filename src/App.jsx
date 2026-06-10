import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import Statistics from './components/Statistics.jsx'
import { SplineSceneBasic } from '@/components/ui/demo'
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

function App() {
  const [todos, setTodos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nextId, setNextId] = useState(1)

  useEffect(() => {
    const controller = new AbortController()

    const loadTodos = async () => {
      try {
        setLoading(true)
        setError('')

        // Try to load from localStorage first
        const savedTodos = localStorage.getItem('app_todos')
        if (savedTodos) {
          const parsedTodos = JSON.parse(savedTodos)
          if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
            setTodos(parsedTodos)
            setNextId(
              parsedTodos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
            )
            setLoading(false)
            return
          }
        }

        // If no localStorage data, fetch from API
        const response = await fetch(API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Unable to fetch todos')
        }

        const data = await response.json()
        const initialTodos = data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          priority: 'medium',
          category: 'general',
          dueDate: '',
          createdAt: new Date().toISOString(),
        }))

        setTodos(initialTodos)
        setNextId(
          initialTodos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
        )
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Unable to load initial todos. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadTodos()

    return () => controller.abort()
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0 && !loading) {
      localStorage.setItem('app_todos', JSON.stringify(todos))
    }
  }, [todos, loading])

  const handleAddTodo = (todoData) => {
    const trimmedTitle = typeof todoData === 'string' ? todoData.trim() : todoData.title?.trim()

    if (!trimmedTitle) {
      return
    }

    const newTodo = {
      id: nextId,
      title: trimmedTitle,
      completed: false,
      priority: typeof todoData === 'string' ? 'medium' : (todoData.priority || 'medium'),
      category: typeof todoData === 'string' ? 'general' : (todoData.category || 'general'),
      dueDate: typeof todoData === 'string' ? '' : (todoData.dueDate || ''),
      createdAt: new Date().toISOString(),
    }

    setTodos((currentTodos) => [newTodo, ...currentTodos])
    setNextId((currentId) => currentId + 1)
  }

  const handleDeleteTodo = async (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    )

    try {
      await fetch(`${API_URL}/${todoId}`, { method: 'DELETE' })
    } catch {
      // The UI update is the important part for this assignment.
    }
  }

  const handleToggleTodo = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    )
  }

  const handleEditTodo = (todoId, editData) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              title: editData.title,
              priority: editData.priority,
              category: editData.category,
              dueDate: editData.dueDate,
            }
          : todo,
      ),
    )
  }

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  const taskInputRef = useRef(null)
  const searchInputRef = useRef(null)

  const focusAddTask = () => taskInputRef.current?.focus()
  const focusSearch = () => searchInputRef.current?.focus()

  return (
    <div className="app-shell">
      <Navbar onAddClick={focusAddTask} onSearchClick={focusSearch} />

      <main className="app-main">
        <section className="hero-panel" id="hero-section">
          <div className="hero-content">
            <div className="space-y-6 max-w-3xl">
              <h1>My Todo App</h1>
              <p className="hero-copy">
                Keep your daily tasks in one place. Add a new todo, search your
                list, and delete anything you no longer need.
              </p>
              <TodoForm
                onAddTodo={handleAddTodo}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                taskInputRef={taskInputRef}
                searchInputRef={searchInputRef}
              />
            </div>
          </div>

          <div className="hero-3d-container">
            <SplineSceneBasic />
          </div>
        </section>

        {loading && (
          <section className="status-card" aria-live="polite">
            Loading initial todos from the API...
          </section>
        )}

        {error && (
          <section className="status-card status-error" role="alert">
            {error}
          </section>
        )}

        <Statistics todos={todos} />

        <TodoList
          todos={filteredTodos}
          isLoading={loading}
          isSearching={searchTerm.trim().length > 0}
          onDeleteTodo={handleDeleteTodo}
          onToggleTodo={handleToggleTodo}
          onEditTodo={handleEditTodo}
        />
      </main>
    </div>
  )
}

export default App
