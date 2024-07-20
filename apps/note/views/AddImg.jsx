import { noteService } from "../services/note.service.js"
const { useState } = React

export function AddImg({ onSetNotes }) {

    const [title, setTitle] = useState('')
    const [imgURL, setImgURL] = useState('')

    function handleImgChange({ target }) {
        setImgURL(target.value)
    }

    function handleTitleChange({ target }) {
        setTitle(target.value)
    }

    function onSaveImgNote() {
        const note = noteService.createImgNote(title, imgURL)
        noteService.save(note).then((newNote) => {
            onSetNotes(newNote)
        })
    }

    return (
        <section className="add-note flex">
            <div className="double-input flex column">
            <input className="add-input" type="text" placeholder="Enter image url.." onChange={handleImgChange} />
            <input className="add-input" type="text" value={title} placeholder="Image title.." onChange={handleTitleChange} />
            </div>
            <button onClick={onSaveImgNote}>Save note</button>
        </section>
    )
}