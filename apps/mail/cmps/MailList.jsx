import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM

export function MailList({ mails, onStar, onSetRead }) {
    return (<div>
        {!mails.length && <div>No mails to display</div>}
            <ul className="mail-list">
                {mails.map(mail =>
                    <Link key={mail.id} to={`/mail/${mail.id}`}>
                        <li> <MailPreview mail={mail} onStar={onStar} onSetRead={onSetRead} />
                        </li>
                    </Link>)}
            </ul>

            <Link to="/mail/compose">
                <button className="compose">
                    <span className="material-symbols-outlined">edit</span>
                    <span>Compose</span>
                </button>
            </Link>

        </div>
    )
}
