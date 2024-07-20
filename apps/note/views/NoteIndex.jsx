import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAddBar } from "../cmps/NoteAddBar.jsx"

const { useState, useEffect } = React


export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    

    useEffect(() => {
        noteService.query(filterBy).then(notes => {
            notes.sort(compareFunc)
            setNotes(notes)
        })
    }, [filterBy])

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Book Removed! ${bookId}`)
            })
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${noteId}`)
            })
    }

    // function onChangeBcgColor(noteId) {
    //     console.log('note:', noteId)
    // }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onTogglePin(noteId) {
        noteService.togglePin(noteId)
        setNotes(prevNotes => {
            const newNotes = [...prevNotes]
            const idx = prevNotes.findIndex((note => note.id === noteId))
            newNotes[idx].isPinned = !newNotes[idx].isPinned
            newNotes.sort(compareFunc)
            return newNotes
        })
    }

    function onSetNotes(note) {
        // noteService.query(filterBy).then(notes => {
        //     notes.sort(compareFunc)
        //     console.log('onSetNotes:', notes)
        setNotes(prevNotes => {
            const newNotes = [...prevNotes]
            newNotes.push(note)
            newNotes.sort(compareFunc)
            return newNotes
        })

    }

    // function setUpdatedNote(note) {
    //     setNotes(prevNotes => {
    //         const newNotes = [...prevNotes]
    //         const idx = prevNotes.findIndex((prevNote => prevNote.id === note.id))
    //         newNotes[idx] = note
    //         return newNotes
    //     })

    // }

    function compareFunc(note1, note2) {
        if (note1.isPinned && !note2.isPinned) {
            return -1
        }
        else if (!note1.isPinned && note2.isPinned) return 1
        else return 1
    }

    function onChangeColor(ev, note) {
        console.log('new color:', ev.target.value)
        console.log('note:' , note)
        note.style.backgroundColor = ev.target.value
        noteService.save(note).then((note) => {
            setNotes(prevNotes => {
                const newNotes = [...prevNotes]
                const idx = prevNotes.findIndex((prevNote => prevNote.id === note.id))
                newNotes[idx].style.backgroundColor = ev.target.value
                newNotes.sort(compareFunc)
                return newNotes
            })
        })
    }

    function onDuplicateNote(note) {
        const newNote = { ...note }
        newNote.id = ''
        noteService.save(newNote)
            .then((dupNote) => {
                setNotes(prevNotes => {
                    const newNotes = [...prevNotes]
                    newNotes.push(dupNote)
                    return newNotes
                })
            })
    }


    if (!notes) return <div>Loading...</div>

    return (
        <section className='note-index'>
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <NoteAddBar onSetNotes={onSetNotes} /*setUpdatedNote={setUpdatedNote}*/ />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onTogglePin={onTogglePin} onChangeColor={onChangeColor} onDuplicateNote={onDuplicateNote}/>
        </section>
    )
}
