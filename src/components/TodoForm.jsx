import { useState } from 'react'

function TodoForm({ onAddTodo, searchTerm, onSearchChange }) {
  const [taskName, setTaskName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddTodo(taskName)
    setTaskName('')
  }

  return (
    <section className="controls-grid" aria-label="Todo controls">
      <form className="panel form-panel" onSubmit={handleSubmit}>
        <div className="panel-label">Add task</div>

        <div className="field-stack">
          <label htmlFor="todo-input">Task name</label>
          <div className="field-row">
            <input
              id="todo-input"
              type="text"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
              placeholder="Write a new todo"
            />
            <button type="submit">Add Todo</button>
          </div>
        </div>
      </form>

      <div className="panel search-panel">
        <div className="panel-label">Search tasks</div>

        <div className="field-stack">
          <label htmlFor="search-input">Filter by title</label>
          <input
            id="search-input"
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search todos"
          />
        </div>
      </div>
    </section>
  )
}

export default TodoForm