import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"

export function NotePreview( { note } ) {

    const {type} = note
    console.log('we are here:' , type)

    return (
        <section>
            {type === 'NoteTxt' && <NoteTxt note={note} />}
            {type === 'NoteImg' && <NoteImg note={note} />}
            {type === 'NoteVideo' && <NoteVideo note={note} />}
            {type === 'NoteTodos' && <NoteTodos note={note} />}
        </section>
    )
}