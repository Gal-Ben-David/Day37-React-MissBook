import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/bookList.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    console.log(books)

    if (!books) return <div>Loading...</div>

    return (
        <article className="books">
            <BookList books={books} />
        </article >
    )
}