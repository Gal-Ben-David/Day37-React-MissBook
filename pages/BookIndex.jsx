import { bookService } from "../services/book.service.js"

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
        <article className="book-list">
            <ul className="book-card">
                {books.map(book =>
                    <li key={book.id}>
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <img src={book.imgSrc} />
                        <p>{`Price: ${book.listPrice.amount}, ${book.listPrice.currencyCode}`}</p>
                    </li>
                )}
            </ul>

        </article>
    )
}