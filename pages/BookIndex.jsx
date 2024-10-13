const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [newBook, setNewBook] = useState(null)
    const [isEditBookMode, setEditBookMode] = useState(false)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    useEffect(() => {
        if (newBook) {
            loadBooks()
            setNewBook(null)
            onToggleEditBook()
        }
    }, [newBook])

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

    function onToggleEditBook() {
        setEditBookMode(isEditBookMode => !isEditBookMode)
    }

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => console.error('Error removing book:', err))
    }

    if (!books) return <div>Loading...</div>

    return (
        <article className="books">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />

            <div>
                <Link to="/book/edit"><button>Add Book</button></Link>
            </div>

            <div>
                <Link to="/book/Add"><button>Add Book from Google API</button></Link>
            </div>

            {/* <button onClick={onToggleEditBook}>Add Book</button>
            {(isEditBookMode) && <BookEdit onSetNewBook={onSetNewBook} />} */}

            <BookList books={books} removeBook={removeBook} />
        </article >
    )
}