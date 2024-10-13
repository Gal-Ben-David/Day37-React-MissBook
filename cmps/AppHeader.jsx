const { Link, NavLink } = ReactRouterDOM



export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <h1>📚 MissBooks</h1>
            <nav className="app-nav">
                <NavLink className="nav" to="/home">Home</NavLink>
                <NavLink className="nav" to="/about">About</NavLink>
                <NavLink className="nav" to="/book" >Books</NavLink>
                <NavLink className="nav" to="/dashboard" >Dashboard</NavLink>
            </nav>
        </header>
    )
}