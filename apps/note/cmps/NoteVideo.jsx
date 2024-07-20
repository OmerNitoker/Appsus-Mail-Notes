
export function NoteVideo({note}) {
    return (
        <iframe src="https://www.youtube.com/embed/64t1COiCMOo" width="560" height="315" title="A YouTube video" frameborder="0" allowfullscreen></iframe>
        // <video controls autoplay muted loop>
        //    <source src={note.info.url}/> 
        // </video>
        // <iframe src={note.info.url} frameborder="0" allow="accelerometer; autoplay" allowfullscreen></iframe>
    )
}