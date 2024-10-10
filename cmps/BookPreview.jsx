const { Link } = ReactRouterDOM

import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState } = React

export function BookPreview({ book, onToggleMoreDetails, isExpanded }) {

    function toggleMoreDetails() {
        onToggleMoreDetails()
    }

    function onToggleEditBook() {
        setEditBookMode(isEditBookMode => !isEditBookMode)
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
            </div>

            <button onClick={toggleMoreDetails}>{!isExpanded ? 'More Details' : 'Show Less'}</button>
            {isExpanded && <BookDetails book={book} />}
        </article>
    )
}