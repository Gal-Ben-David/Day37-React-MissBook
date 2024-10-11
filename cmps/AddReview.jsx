const { useNavigate, useParams } = ReactRouterDOM
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function AddReview() {

    const [bookToReview, setBookToReview] = useState(bookService.getEmptyBook())
    const [starsReview, setStarsReview] = useState(0)
    const [isAddedReview, setIsAddedReview] = useState(false)
    const [fullReview, setFullReview] = useState({
        fullname: '',
        rating: 0,
        date: '1990-03-28',
    })
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

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

    console.log(bookToReview)
    const { reviews } = bookToReview
    return (
        <section className="book-review">
            <h1>Reviews for {bookToReview.title}</h1>

            <h2>Add your review</h2>
            <form className="review" onSubmit={onSaveReview}>
                <div className='review-name'>
                    <label className='review-full-name'>Full Name:</label>
                    <input
                        type='text'
                        placeholder='Enter your name'
                        name='fullname'
                        value={fullReview.fullname}
                        onChange={handleChange}
                    />
                </div>

                <div className="review-rating">
                    {[...Array(5)].map((_, i) =>
                        <img key={i} src={`assets/img/${i < starsReview ? 'full' : 'empty'}-star.png`}
                            onClick={() => onSetRating(i + 1)} />
                    )}
                </div>

                <div className="review-date">
                    <label htmlFor="date">Date</label>
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
                    <li key={i}>
                        <span>{review.fullname} </span>
                        <span>
                            {[...Array(5)].map((_, i) =>
                                <img key={i} src={`assets/img/${i < review.rating ? 'full' : 'empty'}-star.png`} />
                            )}
                        </span>
                        <span>{review.date} </span>
                    </li>
                )}
            </ul>

        </section>

    )

}