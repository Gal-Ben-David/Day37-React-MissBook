import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function App() {
    return (
        <section className="app">
            <header className="app-header main-layout">
                <h1>📚 MissBooks</h1>
            </header>
            <main className="main-layout">
                <Home />
                <BookIndex />
            </main>
        </section>
    )
}