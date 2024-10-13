const { Link } = ReactRouterDOM

import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState } = React

export function BookPreview({ book, onToggleMoreDetails, isExpanded, removeBook }) {

    function toggleMoreDetails() {
        onToggleMoreDetails()
    }

    function onRemoveBook(bookId) {
        removeBook(bookId)
    }

    const {
        title,
        subtitle,
        thumbnail,
        listPrice
    } = book

    return (
        <article className={`book-preview ${(listPrice.isOnSale) && 'on-sale'}`}>
            {(listPrice.isOnSale) && <img className="on-sale" src="assets/img/sale.png" />}
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <img src={thumbnail} />
            <p className={listPrice.amount > 150 ? 'red' : 'green'}>
                {`Price: ${listPrice.amount}, ${listPrice.currencyCode}`}
            </p>

            <div>
                <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
                <Link to={`/book/review/${book.id}`}><button>Show Reviews</button></Link>
                <button onClick={() => onRemoveBook(book.id)}><i className="fa-solid fa-trash"></i></button>
            </div>

            <button onClick={toggleMoreDetails}>{!isExpanded ? 'More Details' : 'Show Less'}</button>
            {isExpanded && <BookDetails book={book} />}
        </article>
    )
}