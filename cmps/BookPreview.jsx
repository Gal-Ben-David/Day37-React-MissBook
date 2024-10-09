import { BookDetails } from "../cmps/BookDetails.jsx"


export function BookPreview({ book }) {

    return (
        <article className={`book-preview ${(book.listPrice.isOnSale) && 'on-sale'}`}>
            {(book.listPrice.isOnSale) && <img className="on-sale" src="assets/img/sale.png" />}
            <h2>{book.title}</h2>
            <p>{book.subtitle}</p>
            <img src={book.thumbnail} />
            <p className={book.listPrice.amount > 150 ? 'red' : 'green'}>
                {`Price: ${book.listPrice.amount}, ${book.listPrice.currencyCode}`}
            </p>
            <BookDetails book={book} />
        </article>
    )
}