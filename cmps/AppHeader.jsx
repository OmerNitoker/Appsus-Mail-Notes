const { useState } = React

const { Link } = ReactRouterDOM

import { MenuPreview } from "./MenuPreview.jsx"

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="app-header">
            <Link className="logo flex align-center" to="/">
                <h3>Appsus</h3>
                <img className="logo-img" src="assets/img/horse.png" alt="" />
            </Link>
            <div>
                <span className="material-symbols-outlined selected-icon menu-header-btn" style={{ cursor: 'pointer' }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    apps
                </span>
                <div className="menu-header">
                    {isMenuOpen && <MenuPreview setIsMenuOpen={setIsMenuOpen} />}
                </div>
            </div>
        </header>
    )
}
