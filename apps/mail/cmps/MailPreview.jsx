import { utilService } from "../../../services/util.service.js"
const { useState } = React

export function MailPreview({ mail, onStar, onSetRead }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const [isRead, setIsRead] = useState(mail.isRead)

    // function getFormattedDate(date){
    //     const day = date.getDate()
    //    const month= utilService.getMonthName(date)
    //    return `${month} ${day}`
    // }
    function handleStarEvent(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        console.log(mail)
        onStar(mail.id)
        .then(setIsStarred(!isStarred))

        // setIsStarred(!isStarred)

    }
    function handleReadEvent(ev) {
        ev.preventDefault()
        console.log(mail)
        onSetRead(mail.id)
        .then(setIsRead(!isRead))
    }
    // function getTxtToShow(txt,length) {
    //     if (txt.length < length) return txt
    //     return txt.substring(0, length) + '...'
    //     }

    const mailRead = isRead ? 'lighter' : ''
    const mailReadPreview =isRead ? 'read' : ''
    const star = isStarred ? 'starred' : ' '
    return (
        <article className={'mail-preview ' + mailReadPreview}>
            <h6 className={"date " + mailRead}>{utilService.formatDate(mail.sentAt)}</h6>
            <h1 className={"from " + mailRead}>{mail.from}</h1>
            <h5 className={mailRead + ' subject'}>{mail.subject}</h5>
            <h5 className="mail-body">{mail.body}</h5>
            <span onClick={handleReadEvent} title="Mark as read/unread" className='read-unread material-symbols-outlined'>
                mark_as_unread
            </span>
            <span onClick={handleStarEvent} className={star + ' star material-symbols-outlined'} title="Star / Unstar">
                star
            </span>
        </article>
    )
}