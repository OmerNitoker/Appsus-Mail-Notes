
const { NavLink } = ReactRouterDOM

export function MenuPreview({setIsMenuOpen}) {
    return (
        <nav className="menu-container flex column">
            <NavLink onClick={() => setIsMenuOpen (menuState => !menuState)} to="/">
                <div className="flex space-between align-center">
                    <h4>Home</h4>
                    <span className="material-symbols-outlined">
                        home
                    </span>
                </div>
            </NavLink>
            <NavLink onClick={() => setIsMenuOpen (menuState => !menuState)} to="/mail">
                <div className="flex space-between align-center">
                    <h4>Mail</h4>
                    <span className="material-symbols-outlined">
                        mail
                    </span>
                </div>
            </NavLink>
            <NavLink onClick={() => setIsMenuOpen (menuState => !menuState)} to="/note">
                <div className="flex space-between align-center">
                    <h4>Notes</h4>
                    <span className="material-symbols-outlined">
                        description
                    </span>
                </div>
            </NavLink>
            {/* <NavLink onClick={() => setIsMenuOpen (menuState => !menuState)} to="/book">
                <div className="flex space-between align-center">
                    <h4>Books</h4>
                    <span className="material-symbols-outlined">
                        menu_book
                    </span>
                </div>
            </NavLink> */}
        </nav>
    )
}