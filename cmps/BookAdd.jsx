import { bookService } from "../services/book.service.js"

const { useNavigate } = ReactRouterDOM

const { useState, useEffect } = React

export function BookAdd() {

    const [searchBook, setSearchBook] = useState(null)
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (searchBook) {
            fetchBooksFromGoogle()
        }
    }, [searchBook])

    function fetchBooksFromGoogle() {
        bookService.fetchBookFromGoogleByTitle(searchBook)
            .then(setBooks)
            .catch(err => console.error('Error:', err))
    }

    function handleChange(ev) {
        setSearchBook(ev.target.value.trim())
    }

    function addBookToDB(bookId) {
        bookService.fetchBookFromGoogleById(bookId)
            .then(book => {
                console.log('Book Saved')
                showSuccessMsg('Book has been saved successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Problems saving book (${bookId})`)
            })
            .finally(() => {
                navigate('/book')
            })
    }

    return (
        <section>
            <div className='add-book'>
                <label></label>
                <input
                    type='search'
                    placeholder='Search'
                    name='search'
                    onChange={handleChange}
                />
            </div>

            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => addBookToDB(book.id)}>+</button>
                    </li>
                ))}
            </ul>

        </section>
    )
}