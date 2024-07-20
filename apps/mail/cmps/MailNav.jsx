import { mailService } from "../services/mail.service.js"
const { useState } = React

export function MailNav({ onSetMailsToShow, unReadMails }) {
    const [isOn, setIsOn] = useState(false)
    // const [unreadMailsCount, setUnreadMailsCount]= useState(0)

    function onShowMails(chosenFolder) {
        setIsOn(!isOn)
        onSetMailsToShow('folder', chosenFolder)
    }
    // function mailCount() {
    //     mailService.getUnreadCount()
    //     .then(res=>{return res})
    // }
    return (
        <div className="mail-nav">
            <nav onClick={() => setIsOn(!isOn)} className="material-symbols-outlined">menu</nav>
            {isOn && <section className={(isOn ? '' : '' )+ 'mail-nav-content'}>
                <div onClick={() => onShowMails('inbox')}>
                    <span className="material-symbols-outlined">inbox</span>
                    <h1>Inbox</h1>
                    <h5>{unReadMails}</h5>
                </div>
                <div onClick={() => onShowMails('starred')}>
                    <span className="material-symbols-outlined">
                        star
                    </span>
                    <h1>Starred</h1>
                </div>
                <div onClick={() => onShowMails('sent')}>
                    <span className="material-symbols-outlined">
                        send
                    </span>
                    <h1 >Sent</h1>
                </div>
                {/* <div onClick={() => onShowMails('drafts')}>
                    <span className="material-symbols-outlined">
                        draft
                    </span>
                    <h1>Drafts</h1>
                </div> */}
                <div onClick={() => onShowMails('trash')}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                    <h1 >Trash</h1>
                </div>
            </section>}
        </div>
    )
}