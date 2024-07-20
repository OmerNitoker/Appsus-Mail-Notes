import { noteService } from "../services/note.service.js"
const { useState } = React


export function AddVideo() {

    const [vidURL, setVidURL] = useState('')


    function OnSaveVidNote() {
        const note = noteService.createVideoNote(txt)
        noteService.save(note).then((newNote) => {
            onSetNotes(newNote)
        })

    }

    function handleVidChange({ target }) {
        setVidURL(target.value)
    }

    return (
        <div className="add-note flex">
            <input className="add-input" type="text" placeholder="Enter video url.." onChange={handleVidChange} />
            <button onClick={OnSaveVidNote}>Save</button>
        </div>
    )

}