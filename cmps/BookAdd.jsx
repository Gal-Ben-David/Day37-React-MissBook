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
        return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchBook}`)
            .then(response => response.json())
            .then(data => {
                const infoList = data.items
                const customList = infoList.map(book => {
                    return { title: book.volumeInfo.title, id: book.id }
                })
                console.log(customList)

                return customList
            })
            .then(setBooks)
            .catch(err => console.error('Error:', err))
    }

    function handleChange(ev) {
        setSearchBook(ev.target.value.trim())
    }

    function addBookToDB(bookId) {
        return fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then(response => response.json())
            .then(bookService.addGoogleBook)
            .then(convertedBook => bookService.save(convertedBook, true)).
            then(book => {
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