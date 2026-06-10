function Statistics({ todos }) {
  const totalTodos = todos.length
  const completedTodos = todos.filter((todo) => todo.completed).length
  const activeTodos = totalTodos - completedTodos
  const completionPercentage =
    totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100)

  const highPriority = todos.filter((todo) => todo.priority === 'high' && !todo.completed)
  const mediumPriority = todos.filter((todo) => todo.priority === 'medium' && !todo.completed)
  const lowPriority = todos.filter((todo) => todo.priority === 'low' && !todo.completed)

  const workTodos = todos.filter((todo) => todo.category === 'work')
  const personalTodos = todos.filter((todo) => todo.category === 'personal')
  const shoppingTodos = todos.filter((todo) => todo.category === 'shopping')
  const healthTodos = todos.filter((todo) => todo.category === 'health')

  const today = new Date().toDateString()
  const todayTodos = todos.filter((todo) => {
    if (!todo.dueDate) return false
    return new Date(todo.dueDate).toDateString() === today
  })

  const overdueTodos = todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false
    return new Date(todo.dueDate) < new Date()
  })

  return (
    <section className="panel stats-panel">
      <div className="panel-label">Statistics</div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{completionPercentage}%</div>
          <div className="stat-label">Completion Rate</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{activeTodos}</div>
          <div className="stat-label">Active Tasks</div>
          <div className="stat-subtitle">{completedTodos} completed</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{highPriority.length}</div>
          <div className="stat-label">High Priority</div>
          <div className="stat-priority-breakdown">
            <span className="breakdown-item" style={{ color: '#ffd93d' }}>
              Medium: {mediumPriority.length}
            </span>
            <span className="breakdown-item" style={{ color: '#6bcf7f' }}>
              Low: {lowPriority.length}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{todayTodos.length}</div>
          <div className="stat-label">Due Today</div>
          {overdueTodos.length > 0 && (
            <div className="stat-alert">⚠️ {overdueTodos.length} overdue</div>
          )}
        </div>
      </div>

      <div className="category-breakdown">
        <div className="breakdown-header">Tasks by Category</div>
        <div className="category-items">
          {workTodos.length > 0 && (
            <div className="category-item">
              <span className="category-dot" style={{ backgroundColor: '#4a9eff' }}></span>
              <span>Work: {workTodos.length}</span>
            </div>
          )}
          {personalTodos.length > 0 && (
            <div className="category-item">
              <span className="category-dot" style={{ backgroundColor: '#ff9a4a' }}></span>
              <span>Personal: {personalTodos.length}</span>
            </div>
          )}
          {shoppingTodos.length > 0 && (
            <div className="category-item">
              <span className="category-dot" style={{ backgroundColor: '#a84aff' }}></span>
              <span>Shopping: {shoppingTodos.length}</span>
            </div>
          )}
          {healthTodos.length > 0 && (
            <div className="category-item">
              <span className="category-dot" style={{ backgroundColor: '#4aff9a' }}></span>
              <span>Health: {healthTodos.length}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Statistics
