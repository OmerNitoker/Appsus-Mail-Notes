import { noteService } from "../services/note.service.js"
const { useState } = React


export function AddTxt({onSetNotes}) {

    const [txt, setTxt] = useState('')

    function OnSaveTxtNote() {
        const note = noteService.createTxtNote(txt)
        noteService.save(note).then((newNote) => {
            onSetNotes(newNote)})
        
    }


    function handleTxtChange({ target }) {
        setTxt(target.value)
    }

    return (
        <div className="add-note flex">
            <input className="add-input" type="text" name="txt-input" value={txt}
                onChange={handleTxtChange}
                placeholder="type to add a text note..." />
            <button className="save-btn" onClick= {OnSaveTxtNote}>Save</button>
        </div>
    )
}

