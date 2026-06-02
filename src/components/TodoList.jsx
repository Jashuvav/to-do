function TodoList({
  todos,
  isLoading,
  isSearching,
  onDeleteTodo,
  onToggleTodo,
}) {
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

  return (
    <section className="panel todo-panel">
      <div className="panel-header">
        <div>
          <div className="panel-label">Todo list</div>
          <h2>Current tasks</h2>
        </div>
        <span className="result-pill">{todos.length} shown</span>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
            <label className="todo-check" htmlFor={`todo-${todo.id}`}>
              <input
                id={`todo-${todo.id}`}
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
              />
              <span>{todo.title}</span>
            </label>

            <button
              type="button"
              className="delete-button"
              onClick={() => onDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TodoList