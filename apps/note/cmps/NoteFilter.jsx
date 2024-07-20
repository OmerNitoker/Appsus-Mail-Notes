const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, type, pinned } = filterByToEdit

    return (
        <section>
            <form className="note-filter flex justify-center" onSubmit={onSubmitFilter}>
                <select className="type-select" name="type" id="type-select" onChange={handleChange}>
                    <option value="">Filter by note type...</option>
                    <option value="NoteTxt">Text</option>
                    <option value="NoteImg">Image</option>
                    <option value="NoteVideo">Video</option>
                    <option value="NoteTodos">List</option>
                </select>

                <input type='text' className="search-note" value={txt} onChange={handleChange} placeholder='Search note' id='txt' name='txt' />
                {/* <div>
                <label htmlFor="pin">Pinned</label>
                <input type="checkbox" id="pin" name="isPinned" value="pin" onChange={handleChange} />
                </div> */}
            </form>
        </section>
    )
}

