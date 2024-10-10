import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails({ book }) {

    const {
        pageCount,
        publishedDate,
        description,
        authors,
        language,
        categories,
        id
    } = book

    let levelReading
    if (pageCount > 500) levelReading = 'Serious Reading'
    else if (pageCount > 200) levelReading = 'Descent Reading'
    else levelReading = 'Light Reading'

    const year = new Date().getFullYear()
    const agePubDate = (year - publishedDate > 10) ? 'Vintage' : 'New'

    return (
        <article className="full-data">
            <div><LongTxt txt={description} /></div>

            <p>Auth {authors.map((author, i) =>
                <span key={i}>{author}</span>
            )}
            </p>

            <p>Pub Date  <span> {`${publishedDate} (${agePubDate})`}</span></p>
            <p>Pgs <span> {`${pageCount} (${levelReading})`}</span></p>
            <p>Lang <span>{language}</span></p>

            <p>Cats
                <span>{categories.map((category, i) =>
                    <span key={i}>{category}{i < categories.length - 1 && ', '}</span>
                )}</span>
            </p>

            <p>SKU <span>{id}</span></p>

        </article>
    )
}