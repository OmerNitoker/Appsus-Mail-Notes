const { Link } = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h2>Welcome to Appsus</h2>
        <div className="app-benefits">
            <h3>Stay in touch with your friends and family</h3>
            <h3>All of your tasks in one place</h3>
            <h3> Be more productive</h3>
            <h3>Be more creative</h3>
        </div>
        <div className="icons">
            <Link to={`/mail`} className="link">
                <span className="material-symbols-outlined">
                    mail
                </span>
                <h4>Mail</h4>
            </Link>
            <Link to={`/note`} className="link">

                <span className="material-symbols-outlined">
                    description
                </span>
                <h4>Notes</h4>
            </Link>
            <Link to={`/`} className="link">

                <span className="material-symbols-outlined">
                    menu_book
                </span>
                <h4>Book Store - soon!</h4>
            </Link>
        </div>
    </section>
}