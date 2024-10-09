import { BookPreview } from "./BookPreview.jsx";

const { useState } = React

export function BookList({ books, onRemoveBook, onSelectBookId }) {

    const [expandedBookId, setExpandedBookId] = useState(null)

    function onToggleMoreDetails(bookId) {
        setExpandedBookId(prevId => (prevId === bookId ? null : bookId))
    }

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} onToggleMoreDetails={() => onToggleMoreDetails(book.id)} isExpanded={expandedBookId === book.id} />
                </li>
            )}
        </ul>
    )

}