// note service

import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js"

export const noteService = {
    query,
    get,
    remove,
    save,
    getFilterBy,
    setFilterBy,
    getDefaultFilter,
    togglePin,
    createTxtNote,
    createImgNote,
    createVideoNote,
    createTodosNote,
}

const NOTES_KEY = 'notesDB'
var gFilterBy = { txt: '', type: '', isPinned: false }
_createNotes()

function query(filterBy) {
    return storageService.query(NOTES_KEY).then(notes => {
        if (filterBy.txt) {
            notes = notes.filter(note => filterByTxt(note, filterBy.txt))
            // const regex = new RegExp(filterBy.txt, 'i')
            // notes = notes.filter(note => regex.test(note.info.txt ))
        }
        if (filterBy.type) {
            notes = notes.filter(note => note.type === filterBy.type)
        }
        if (filterBy.pinned) {
            notes = notes.filter(note => note.isPinned)
        }
        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.type !== undefined) gFilterBy.type = filterBy.type
    if (filterBy.pinned !== undefined) gFilterBy.pinned = filterBy.pinned
    return gFilterBy
}

function getDefaultFilter() {
    return { txt: '', type: '', pinned: false }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#8E9ADA' },
                info: { txt: 'Fullstack Me Baby!' }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: { url: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350", title: 'Mitsi' },
                style: { backgroundColor: '#8E9ADA' }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { todoId: 'ksgf58', txt: 'Read a book', doneAt: null },
                        { todoId: 'akue99', txt: 'Plant a tree', doneAt: null },
                        { todoId: 'dlskjfs', txt: 'Make lemonade', doneAt: null },
                        { todoId: 'kjmdk', txt: 'Watch movie', doneAt: null },
                        { todoId: '9dsks', txt: 'Take a walk', doneAt: null },

                    ]
                },
                style: { backgroundColor: '#8E9ADA' }
            },
            {
                id: 'n104',
                type: 'NoteImg',
                isPinned: false,
                info: { url: "https://yt3.googleusercontent.com/g5Ytq77hxUy5dbwhGnpNfztjUs3GNz_YSZjcZNtU5XpcsWiJO1YUKAjQuof5CchcdD1Q92Wufw=s900-c-k-c0x00ffffff-no-rj", title: 'React King!' },
                style: { backgroundColor: '#8E9ADA' }
            },
            {
                id: 'n105',
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#8E9ADA' },
                info: { txt: 'Under a silvery moon, Mia found a key. It opened a door in a tree. Inside, luminous fairies danced. They whispered ancient secrets and crowned her their friend. Dawn arrived, but the magic lingered in Mias heart forever.' }
            },
            {
                id: 'n106',
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#8E9ADA' },
                info: { txt: 'Why did the bicycle fall over? It was two-tired!' }
            },
            {
                id: 'n107',
                type: 'NoteVideo',
                isPinned: false,
                info: { url: 'https://www.youtube.com/watch?v=64t1COiCMOo' },
                style: { backgroundColor: '#8E9ADA' }
            },
            {
                id: 'n108',
                type: 'NoteImg',
                isPinned: false,
                info: { url: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg", title: 'Cute puppy' },
                style: { backgroundColor: '#8E9ADA' }
            },
            {
                id: 'n109',
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#8E9ADA' },
                info: { txt: 'The meaning of life varies: a quest for purpose, connection, understanding, happiness, or leaving a legacy. Its a journey, uniquely interpreted by each individual.' }
            }

            
        ]
        utilService.saveToStorage(NOTES_KEY, notes)
    }
}

function filterByTxt(note, text) {
    switch (note.type) {
        case 'NoteTxt':
            if (note.info.txt.includes(text)) return true
            break
        case 'NoteImg':
            if (note.info.title.includes(text)) return true
            break
        case 'NoteVideo':
            if (note.info.title.includes(text)) return true
            break
        case 'NoteTodos':
            if (note.info.title.includes(text)) return true
            for (let i = 0; i < note.info.todos.length; i++) {
                console.log('note.info.todos:', note.info.todos)

                if (note.info.todos[i].txt.includes(text)) return true
            }
            // note.info.todos.forEach(todo => {
            //     if(todo.txt.includes(text)) return true
            // })
            break
        default: return false
    }
}

function togglePin(noteId) {
    get(noteId)
        .then((note) => {
            note.isPinned = !note.isPinned
            save(note)
        })
}

function createTxtNote(txt) {

    const newNote = {
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#8E9ADA' },
        info: { txt }
    }

    // save(newNote)
    return newNote



}

function createImgNote(title, url) {
    const newNote = {
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        info: { url, title },
        style: { backgroundColor: '#8E9ADA' }
    }

    return newNote
}

function createVideoNote(url) {
    const newNote = {
        createdAt: Date.now(),
        type: 'NoteVideo',
        isPinned: false,
        info: { url },
        style: { backgroundColor: '#8E9ADA' }
    }

    return newNote
}

function createTodosNote(title, txt) {
    const list = txt.split(',')
    const todos = []
    list.forEach(todo => {
        todos.push({
            todoId: storageService.makeId(),
            txt: todo,
            doneAt: null
        })
    })
    const newNote = {
        createdAt: Date.now(),
        type: 'NoteTodos',
        isPinned: false,
        info: { title, todos },
        style: { backgroundColor: '#8E9ADA' }
    }

    return newNote
}

// function updateTxtNote(note, newTxt) {
//     note.info.txt = newTxt
//     return note
// }

// function updateImgNote(note, newURL, newTitle) {
//     note.info.url = newURL
//     note.info.title = newTitle
//     return note
// }

// function updateVideoNote(note, newURL) {
//     note.info.url = newURL
//     return note
// }

// function updateTodosNote(note, newTitle, newTodos) {
//     const list = newTodos.split(',')
//     const todos = []
//     list.forEach(todo => {
//         todos.push({
//             todoId: storageService.makeId(),
//             txt: todo,
//             doneAt: null
//         })
//         note.info.title = newTitle
//         note.info.todos = todos
//     })
//     return note
// }

