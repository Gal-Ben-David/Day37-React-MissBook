const { useNavigate, useParams, Link } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState, useEffect } = React

export function AddReview() {

    const [bookToReview, setBookToReview] = useState(bookService.getEmptyBook())
    const [starsReview, setStarsReview] = useState(0)
    const [isAddedReview, setIsAddedReview] = useState(false)
    const [isDeletedReview, setIsDeletedReview] = useState(false)
    const [cmpType, setCmpType] = useState('select')

    const [fullReview, setFullReview] = useState({
        fullname: '',
        rating: 0,
        date: '1990-03-28',
    })

    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    useEffect(() => {
        console.log(starsReview)
    }, [starsReview])

    useEffect(() => {
        setStarsReview(0)
        setFullReview({
            fullname: '',
            rating: 0,
            date: '1990-03-28',
        })
        loadBook()
    }, [isAddedReview])

    useEffect(() => {
        loadBook()
    }, [isDeletedReview])


    function loadBook() {
        bookService.get(bookId).then(setBookToReview)
    }

    function onSetRating(rating) {
        setStarsReview(rating)
        setFullReview(prevReview => ({ ...prevReview, rating }))
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            case 'date':
                value = target.value
                break;
        }
        // setBookToReview((prevBook) => ({ ...prevBook, review: { ...prevBook.review, review } }))
        setFullReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, fullReview)
            .then(() => {
                setIsAddedReview(isAddedReview => !isAddedReview)
            })
            .catch(err => console.log(err))
    }

    function onDeleteReview(reviewIdx) {
        bookService.deleteReview(bookId, reviewIdx)
            .then(updatedBook => {
                setBookToReview(updatedBook)
                setIsDeletedReview(isDeletedReview => !isDeletedReview)
            })
            .catch(err => console.log(err))
    }

    const { thumbnail, reviews } = bookToReview

    return (
        <section className="book-review">
            <h1>Reviews for {bookToReview.title}</h1>
            <img src={thumbnail} />
            <BookDetails book={bookToReview} />

            <h2>Add your review</h2>
            <form onSubmit={onSaveReview}>
                <div className='review-name'>
                    <label className='review-full-name'>Full Name</label>
                    <input
                        type='text'
                        placeholder='Enter your name'
                        name='fullname'
                        value={fullReview.fullname}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="radio"
                            value="select"
                            name="rating"
                            checked={cmpType === 'select'}
                            onChange={ev => setCmpType(ev.target.value)}
                        />
                        Select List
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="textbox"
                            name="rating"
                            checked={cmpType === 'textbox'}
                            onChange={ev => setCmpType(ev.target.value)}
                        />
                        Textbox
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="stars"
                            name="rating"
                            checked={cmpType === 'stars'}
                            onChange={ev => setCmpType(ev.target.value)}
                        />
                        Stars
                    </label>
                </div>

                {/* <select value={cmpType} onChange={ev => setCmpType(ev.target.value)}>
                    <option>select</option>
                    <option>textbox</option>
                    <option>stars</option>
                </select> */}

                <section className="dynamic-cmps">
                    <DynamicCmp cmpType={cmpType} onSetRating={onSetRating} />
                </section>

                {cmpType === 'stars' && <div className="review-rating">
                    {[...Array(5)].map((_, i) =>
                        <img key={i} src={`assets/img/${i < starsReview ? 'full' : 'empty'}-star.png`}
                            onClick={() => onSetRating(i + 1)} />
                    )}
                </div>}

                <div className="review-date">
                    <label htmlFor="date">Read At</label>
                    <input
                        onChange={handleChange}
                        value={fullReview.date}
                        type="date"
                        id="date"
                        name="date"></input>
                </div>

                <div>
                    <button className='save-review-btn' >
                        Save ✔
                    </button>
                </div>
            </form>


            <h2>All Reviews</h2>
            <ul>
                {!reviews.length ? 'No review yet...' : reviews.length !== 0 && reviews.map((review, i) =>
                    <li className="review" key={i}>
                        <span>{review.fullname} </span>
                        <span>
                            {[...Array(5)].map((_, i) =>
                                <img key={i} src={`assets/img/${i < review.rating ? 'full' : 'empty'}-star.png`} />
                            )}
                        </span>
                        <span>{review.date} </span>
                        <button onClick={() => onDeleteReview(i)}>Delete</button>
                    </li>
                )}
            </ul>

            <section>
                <button ><Link to={`/book/review/${bookToReview.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/review/${bookToReview.nextBookId}`}>Next Book</Link></button>
            </section>

        </section>

    )

}

function DynamicCmp(props) {

    switch (props.cmpType) {
        case 'select':
            return <RateBySelect {...props} />
        case 'textbox':
            return <RateByTextbox {...props} />
        default:
            return null
    }
}

function RateBySelect({ onSetRating }) {
    return (
        <div> <span>Rating &nbsp;</span>
            <select onChange={(event) => onSetRating(+event.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}

function RateByTextbox({ onSetRating }) {
    return (
        <div>
            <label htmlFor="rating">Rating</label>
            <input
                type="text"
                id="rating"
                placeholder="Enter rating"
                onChange={(event) => onSetRating(+event.target.value)}
            />
        </div>
    )
}