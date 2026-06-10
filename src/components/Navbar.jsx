function Navbar({ onAddClick, onSearchClick }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h2>To-Do Application</h2>
      </div>
      <div className="navbar-actions">
        <button type="button" className="nav-button nav-button-primary" onClick={onAddClick}>
          + Add Task
        </button>
        <button type="button" className="nav-button nav-button-secondary" onClick={onSearchClick}>
          Search
        </button>
      </div>
    </header>
  )
}

export default Navbar