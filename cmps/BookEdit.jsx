export function BookEdit({ onSetNewBook }) {

    function onAddBook(ev) {
        ev.preventDefault()
        const from = ev.target
        const title = from.title.value
        const price = from.price.value

        const newBook = {
            title,
            listPrice: {
                amount: price,
                currencyCode: 'EUR',
                isOnSale: false
            }
        }

        onSetNewBook(newBook)
    }

    return (
        <form onSubmit={onAddBook}>
            <label htmlFor="book-title">Book Title</label>
            <input type="text" name="title" id="book-title" />

            <label htmlFor="book-price">Price</label>
            <input type="number" name="price" id="book-price" />

            <button>Submit</button>
        </form>
    )
}