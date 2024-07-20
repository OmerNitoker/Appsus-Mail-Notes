import { mailService } from "../services/mail.service.js";
import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [isStarred, setIsStarred] = useState(null)


    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
                setIsStarred(mail.isStarred)
            })
            // .then(res=>console.log(res))
            // .then(setIsStarred(mail.isStarred))
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }


    function onBack() {
        navigate('/mail')
        // navigate(-1)
    }

    function onRemoveMail() {
        console.log(mail)
        mailService.remove(params.mailId)
            .then(onBack)

    }

    function onStar(mailId) {
        mailService.star(mailId)
            .then(setIsStarred(!isStarred))

    }

    function onSaveMailToNotes() {
        const txt = mail.subject + '\n' + mail.body
        const note = noteService.createTxtNote(txt)
        noteService.save(note)
    }

    if (!mail) return <div>Loading...</div>
    const star = isStarred ? 'starred' : ' '
    return (
        <section className="mail-details">
            <span onClick={onBack} className="material-symbols-outlined">
                arrow_back_ios
            </span>
            <div className="options">
                <span onClick={onSaveMailToNotes} className="material-symbols-outlined" title="Save to notes">
                    description
                </span>
                <span onClick={onRemoveMail} className="material-symbols-outlined" title="Delete mail">
                    delete
                </span>
                <span onClick={() => onStar(mail.id)} className={star + ' star material-symbols-outlined'} title="Star / Unstar">
                    star
                </span>
            </div>
            <h2 className="subject">{mail.subject}</h2>
            <h5 className="from">{mail.from}</h5>
            <h5 className="time">{utilService.formatDate(mail.sentAt)}</h5>
            <h4 className="mail-body">{mail.body}</h4>
        </section>
    )
}