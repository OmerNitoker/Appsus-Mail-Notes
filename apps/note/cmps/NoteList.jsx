import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemoveNote, onTogglePin, onChangeColor, onDuplicateNote }) {


    console.log('notes before render:', notes)
    console.log(typeof (notes[0].style.backgroundColor))

    


    return (
        <ul className='notes-container'>
            {notes.map(note => (
                <li className="note" style={{ backgroundColor: note.style.backgroundColor }} key={note.id}>
                    <NotePreview note={note} />
                    <section className="icons">
                        <label>

                            <input type="color" className="hide" name="color-picker" onChange={event => onChangeColor(event, note)} />
                            {/* {showColorPicker && <input type="color" name="color-picker" onChange={(event)} />} */}
                            <span className="material-symbols-outlined"
                            //  onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}
                            >
                                palette
                            </span>
                        </label>
                        <span className={"material-symbols-outlined" + (note.isPinned ? " selected-icon" : '')} onClick={() => onTogglePin(note.id)}>
                            push_pin
                        </span>
                        {/* <span className="material-symbols-outlined">
                            edit_note
                        </span> */}
                        <span className="material-symbols-outlined" onClick={() => onDuplicateNote(note)}>
                            content_copy
                        </span>
                        <span className="material-symbols-outlined" onClick={() => onRemoveNote(note.id)}>
                            delete
                        </span>
                        {/* <span className="material-symbols-outlined">
                            outgoing_mail
                        </span> */}
                    </section>
                </li>
            ))}
        </ul>

    )
}
