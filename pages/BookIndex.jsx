import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/bookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    if (!books) return <div>Loading...</div>

    return (
        <article className="books">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <BookList books={books} />
        </article >
    )
}