import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails({ book }) {

    let levelReading
    if (book.pageCount > 500) levelReading = 'Serious Reading'
    else if (book.pageCount > 200) levelReading = 'Descent Reading'
    else levelReading = 'Light Reading'

    const year = new Date().getFullYear()
    const agePubDate = (year - book.publishedDate > 10) ? 'Vintage' : 'New'

    return (
        <article className="full-data">
            <div><LongTxt txt={book.description} /></div>

            <p>Auth {book.authors.map((author, i) =>
                <span key={i}>{author}</span>
            )}</p>

            <p>Pub Date  <span> {`${book.publishedDate} (${agePubDate})`}</span></p>
            <p>Pgs <span> {`${book.pageCount} (${levelReading})`}</span></p>
            <p>Lang <span>{book.language}</span></p>

            <p>Cats <span>{book.categories.map((category, i) =>
                <span key={i}>{category}{i < book.categories.length - 1 && ', '}</span>
            )}</span></p>

            <p>SKU <span>{book.id}</span></p>

        </article>
    )
}