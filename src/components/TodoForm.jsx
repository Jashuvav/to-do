import { useState } from 'react'

function TodoForm({ onAddTodo, searchTerm, onSearchChange, taskInputRef, searchInputRef }) {
  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('general')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddTodo({
      title: taskName,
      priority,
      category,
      dueDate
    })
    setTaskName('')
    setPriority('medium')
    setCategory('general')
    setDueDate('')
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
              ref={taskInputRef}
              type="text"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
              placeholder="Write a new todo"
            />
            <button type="submit">Add Todo</button>
          </div>
        </div>

        <div className="field-row-inline">
          <div className="field-stack">
            <label htmlFor="priority-select">Priority</label>
            <select
              id="priority-select"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="select-input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="field-stack">
            <label htmlFor="category-select">Category</label>
            <select
              id="category-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="select-input"
            >
              <option value="general">General</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
          </div>

          <div className="field-stack">
            <label htmlFor="due-date-input">Due Date</label>
            <input
              id="due-date-input"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="input-date"
            />
          </div>
        </div>
      </form>

      <div className="panel search-panel">
        <div className="panel-label">Search tasks</div>

        <div className="field-stack">
          <label htmlFor="search-input">Filter by title</label>
          <input
            id="search-input"
            ref={searchInputRef}
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