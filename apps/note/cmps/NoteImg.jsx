
export function NoteImg({ note }) {
    const url = note.info.url
    return (
        <section>
            <img
                src= {url}
                alt="can't show the image"
            />
            <h3>{note.info.title}</h3>
        </section>
    )
}