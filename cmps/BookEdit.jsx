const { useNavigate, useParams } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId).then(setBookToEdit)
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
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleListPriceChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...book.listPrice, [field]: value } }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(book => {
                console.log('Book Saved')
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/book')
            })
    }

    function onCancelEdit() {
        navigate('/book')
    }

    return (
        <section className='book-edit'>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Title:</label>
                    <input
                        type='text'
                        placeholder='Enter New Title'
                        name='title'
                        value={bookToEdit.title}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Description:</label>
                    <textarea
                        type='text'
                        placeholder='Enter New Title'
                        name='description'
                        value={bookToEdit.description}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Price:</label>
                    <input
                        type='number'
                        placeholder='Set Price'
                        name='amount'
                        onChange={handleListPriceChange}
                        value={bookToEdit.listPrice.amount}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>On Sale:</label>
                    <input
                        type='checkbox'
                        placeholder='Set Price'
                        name='isOnSale'
                        onChange={handleListPriceChange}
                        checked={bookToEdit.listPrice.isOnSale}
                    />
                </div>

                <div className='book-edit-actions-container'>
                    <button className='save-edit-btn' >
                        Save ✔
                    </button>
                    <button
                        type='button'
                        className='cancel-edit-btn'
                        onClick={onCancelEdit}
                    >
                        Cancel ✖
                    </button>
                </div>

            </form>
        </section>
    )
}