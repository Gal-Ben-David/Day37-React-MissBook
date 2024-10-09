import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = {}, desc = '', imgSrc = '') {
    return { title, listPrice, desc, imgSrc }
}

function getDefaultFilter() {
    return { title: '', price: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Harry Potter 1', { amount: 109, currencyCode: 'EUR', isOnSale: false },
                'placerat nisi sodales suscipit tellus', '/assets/img/1.jpg'),

            _createBook('Harry Potter 2', { amount: 98, currencyCode: 'EUR', isOnSale: false },
                'placerat nisi sodales suscipit tellus', '/assets/img/2.jpg'),

            _createBook('Harry Potter 3', { amount: 92, currencyCode: 'EUR', isOnSale: false },
                'placerat nisi sodales suscipit tellus', '/assets/img/3.jpg'),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice = {}, desc, imgSrc) {
    const book = getEmptyBook(title, listPrice, desc, imgSrc)
    book.id = makeId()
    return book
}