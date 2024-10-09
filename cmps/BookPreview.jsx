import { BookDetails } from "../cmps/BookDetails.jsx"


export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <img src={book.imgSrc} />
            <p>{`Price: ${book.listPrice.amount}, ${book.listPrice.currencyCode}`}</p>
            <BookDetails />
        </article>
    )
}