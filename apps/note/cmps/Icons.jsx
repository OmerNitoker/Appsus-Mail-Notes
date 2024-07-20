
export function Icons({setNoteType , noteType}) {

    return (
        <section className="type-icons">
            <span className={"material-symbols-outlined" + (noteType === 'NoteTxt' ? ' selected-icon' : '')} onClick ={() => setNoteType('NoteTxt')}>
                text_fields
            </span>
            <span className={"material-symbols-outlined" + (noteType === 'NoteImg' ? ' selected-icon' : '')} onClick ={() => setNoteType('NoteImg')}>
                image
            </span>
            <span className={"material-symbols-outlined" + (noteType === 'NoteVideo' ? ' selected-icon' : '')} onClick ={() => setNoteType('NoteVideo')}>
                videocam
            </span>
            {/* <span className={"material-symbols-outlined" + (noteType === 'NoteAudio' ? ' selected-icon' : '')} onClick ={() => setNoteType('NoteAudio')}>
                mic
            </span> */}
            <span className={"material-symbols-outlined" + (noteType === 'NoteTodos' ? ' selected-icon' : '')} onClick ={() => setNoteType('NoteTodos')}>
                format_list_bulleted
            </span>
        </section>
    )
}