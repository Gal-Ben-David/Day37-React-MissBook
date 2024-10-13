const { useEffect, useState } = React
import { bookService } from "../services/book.service.js"
import { Chart } from '../cmps/Chart.jsx'

export function Dashboard() {

    const [books, setBooks] = useState([])
    const [categoryStats, setCategoryStats] = useState([])

    useEffect(() => {
        bookService.query()
            .then(setBooks)

        bookService.getCategoryStats()
            .then(res => {
                console.log(res)
                setCategoryStats(res)
            }
            )

    }, [])

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} Books</h2>
            <Chart data={categoryStats} />
        </section>
    )
}
