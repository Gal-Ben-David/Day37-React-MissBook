export function BookDetails({ book }) {

    let levelReading
    if (book.pageCount > 500) levelReading = 'Serious Reading'
    else if (book.pageCount > 200) levelReading = 'Descent Reading'
    else levelReading = 'Light Reading'

    const year = new Date().getFullYear()
    const agePubDate = (year - book.publishedDate > 10) ? 'Vintage' : 'New'

    return (
        <article className="full-data">
            <p>{book.description}</p>
            <p>Auth {book.authors.map((author, i) =>
                <span key={i}>{author}</span>
            )}</p>
            <p>Pub Date  <span> {`${book.publishedDate} (${agePubDate})`}</span></p>
            <p>Pgs <span> {`${book.pageCount} (${levelReading})`}</span></p>
            <p>Lang <span>{book.language}</span></p>
            <p>Cats <span>{book.categories.map((category, i) =>
                <span key={i}>{category}</span>
            )}</span></p>
            <p>SKU <span>{book.id}</span></p>

        </article>
    )
}