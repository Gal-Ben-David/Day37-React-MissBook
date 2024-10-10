const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    //console.log('filterByToEdit:', filterByToEdit)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { title, price } = filterByToEdit
    return (
        <section className="book-filter">
            <form>
                <label htmlFor="book-title">Book Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="book-title" />

                <label htmlFor="book-price">Price</label>
                <input onChange={handleChange} value={price || ''} type="number" name="price" id="book-price" />

                <button>Search</button>
            </form>
        </section>
    )
}