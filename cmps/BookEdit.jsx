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
            },
            subtitle: 'placerat nisi sodales suscipit tellus',
            authors: [],
            publishedDate: '',
            description: 'placerat nisi sodales suscipit tellus',
            pageCount: 100,
            categories: [],
            thumbnail: 'assets/img/book.png',
            language: ''
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