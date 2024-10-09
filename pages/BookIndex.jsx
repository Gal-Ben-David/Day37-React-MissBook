import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/bookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"

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

    function onSetNewBook(newBook) {

        bookService.save(newBook)
            .then((savedBook) => {
                setNewBook(savedBook)
            })
            .catch(err => console.log('err', err))
    }

    function onToggleEditBook() {
        setEditBookMode(isEditBookMode => !isEditBookMode)
    }

    if (!books) return <div>Loading...</div>

    return (
        <article className="books">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />

            <button onClick={onToggleEditBook}>Add Book</button>
            {(isEditBookMode) && <BookEdit onSetNewBook={onSetNewBook} />}

            <BookList books={books} />
        </article >
    )
}