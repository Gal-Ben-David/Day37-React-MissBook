import { BookDetails } from "../cmps/BookDetails.jsx"


export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <img src={book.thumbnail} />
            <p>{`Price: ${book.listPrice.amount}, ${book.listPrice.currencyCode}`}</p>
            <BookDetails />
        </article>
    )
}