import { useState } from 'react'

function TodoList({
  todos,
  isLoading,
  isSearching,
  onDeleteTodo,
  onToggleTodo,
  onEditTodo,
}) {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({
    title: '',
    priority: 'medium',
    category: 'general',
    dueDate: '',
  })

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditData({
      title: todo.title,
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate,
    })
  }

  const saveEdit = (todoId) => {
    if (editData.title.trim()) {
      onEditTodo(todoId, editData)
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ff6b6b',
      medium: '#ffd93d',
      low: '#6bcf7f',
    }
    return colors[priority] || '#ffd93d'
  }

  const getCategoryColor = (category) => {
    const colors = {
      work: '#4a9eff',
      personal: '#ff9a4a',
      shopping: '#a84aff',
      health: '#4aff9a',
      general: '#8ee3a9',
    }
    return colors[category] || '#8ee3a9'
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (isLoading) {
    return (
      <section className="panel todo-panel">
        <div className="panel-label">Todo list</div>
        <p className="muted">Fetching initial tasks from the API...</p>
      </section>
    )
  }

  if (todos.length === 0) {
    return (
      <section className="panel todo-panel empty-panel">
        <div className="panel-label">Todo list</div>
        <h2>{isSearching ? 'No matching todos found' : 'No todos yet'}</h2>
        <p className="muted">
          {isSearching
            ? 'Try a different search term to find a task.'
            : 'Use the form above to add your first task.'}
        </p>
      </section>
    )
  }

  const completedCount = todos.filter((t) => t.completed).length
  const highPriorityCount = todos.filter((t) => t.priority === 'high' && !t.completed).length

  return (
    <section className="panel todo-panel">
      <div className="panel-header">
        <div>
          <div className="panel-label">Todo list</div>
          <h2>Current tasks</h2>
        </div>
        <div className="result-stats">
          <span className="result-pill">{todos.length} total</span>
          <span className="result-pill">{completedCount} done</span>
          {highPriorityCount > 0 && (
            <span className="result-pill" style={{ borderColor: '#ff6b6b' }}>
              {highPriorityCount} urgent
            </span>
          )}
        </div>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''} priority-${todo.priority}`}>
            {editingId === todo.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="edit-input"
                  autoFocus
                />
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                  className="edit-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="edit-select"
                >
                  <option value="general">General</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                </select>
                <input
                  type="date"
                  value={editData.dueDate}
                  onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                  className="edit-date"
                />
                <button
                  type="button"
                  className="save-button"
                  onClick={() => saveEdit(todo.id)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <label className="todo-check" htmlFor={`todo-${todo.id}`}>
                  <input
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleTodo(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>

                <div className="todo-meta">
                  <span
                    className="priority-badge"
                    style={{ '--priority-color': getPriorityColor(todo.priority) }}
                  >
                    {todo.priority?.charAt(0).toUpperCase() + todo.priority?.slice(1)}
                  </span>

                  <span
                    className="category-badge"
                    style={{ '--category-color': getCategoryColor(todo.category) }}
                  >
                    {todo.category?.charAt(0).toUpperCase() + todo.category?.slice(1)}
                  </span>

                  {todo.dueDate && (
                    <span
                      className="due-date-badge"
                      style={{
                        '--due-date-color':
                          new Date(todo.dueDate) < new Date() ? '#ff6b6b' : '#6bcf7f',
                      }}
                    >
                      {formatDueDate(todo.dueDate)}
                    </span>
                  )}

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => startEdit(todo)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TodoList