import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
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

        const response = await fetch(API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Unable to fetch todos')
        }

        const data = await response.json()
        const initialTodos = data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
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

  const handleAddTodo = (title) => {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    setTodos((currentTodos) => [
      {
        id: nextId,
        title: trimmedTitle,
        completed: false,
      },
      ...currentTodos,
    ])
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

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <section className="hero-panel" id="hero-section">
          <h1>My Todo App</h1>
          <p className="hero-copy">
            Keep your daily tasks in one place. Add a new todo, search your
            list, and delete anything you no longer need.
          </p>

          <TodoForm
            onAddTodo={handleAddTodo}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
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

        <TodoList
          todos={filteredTodos}
          isLoading={loading}
          isSearching={searchTerm.trim().length > 0}
          onDeleteTodo={handleDeleteTodo}
          onToggleTodo={handleToggleTodo}
        />
      </main>
    </div>
  )
}

export default App
