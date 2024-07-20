// import { noteService } from '../services/note.service.js'
// import { AddTypeMenu } from './AddTypeMenu.jsx'
import { Icons } from './Icons.jsx'
import { AddTxt } from '../views/AddTxt.jsx'
import {AddImg} from '../views/AddImg.jsx'
import {AddVideo} from '../views/AddVideo.jsx'
import {AddList} from '../views/AddList.jsx'
import {AddAudio} from '../views/AddAudio.jsx'


const { useState } = React

export function NoteAddBar({onSetNotes , setUpdatedNote}) {
    const [noteType, setNoteType] = useState('NoteTxt')
    

    return (
        <section className="add-bar flex">
            <div className="type-to-add">
            {noteType === 'NoteTxt' && <AddTxt onSetNotes={onSetNotes} />}
            {noteType === 'NoteImg' && <AddImg onSetNotes={onSetNotes} />}
            {noteType === 'NoteVideo' && <AddVideo/>}
            {noteType === 'NoteTodos' && <AddList onSetNotes={onSetNotes}/>}
            {noteType === 'NoteAudio' && <AddAudio />}
            </div>
            <Icons setNoteType={setNoteType} noteType = {noteType} />
        </section>

    )
}