
import { noteService } from "../services/note.service.js"
const { useState } = React

export function AddList({ onSetNotes }) {
    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState('')

    function OnSaveTodosNote() {
        const note = noteService.createTodosNote(title, todos)
        noteService.save(note).then((newNote) => {
            onSetNotes(newNote)
        })

    }

    function handleTitleChange({ target }) {
        setTitle(target.value)
    }

    function handleTodosChange({ target }) {
        setTodos(target.value)
    }

    return (
        <div className="add-note flex">
            <div className="double-input flex column">
                <input className="add-input" type="text" value={title} placeholder="Note title.." onChange={handleTitleChange} />
                <input className="add-input" type="text" name="todo-input" value={todos}
                    onChange={handleTodosChange}
                    placeholder="Enter comma separated list.." />
            </div>
            <button onClick={OnSaveTodosNote}>Save</button>
        </div>
    )
}

