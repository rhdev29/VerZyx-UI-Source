import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AUTH_CHANGE_EVENT, hasStoredAuthSession } from '../../features/auth/auth-session';

function Navbar() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const syncAuthState = () => setIsSignedIn(hasStoredAuthSession());

        syncAuthState();
        window.addEventListener(AUTH_CHANGE_EVENT, syncAuthState);
        window.addEventListener('storage', syncAuthState);

        return () => {
            window.removeEventListener(AUTH_CHANGE_EVENT, syncAuthState);
            window.removeEventListener('storage', syncAuthState);
        };
    }, []);

    return (
    <header className="navbar">
        <nav className="navbar-inner">
            <div className="navbar-brand">
            </div>
                <Link to="/" className="navbar-brand-name">VerZyxUI</Link>
            <div className="navbar-link">
                <Link to="/">Home</Link>
                <Link to="/profile" className="link-profile-navbar">Profil</Link>
                <Link to="/about">About</Link>
                <Link to="/elements">Elements</Link>
            </div>
            <div className="navbar-join">
                {!isSignedIn && (
                    <>
                        <Link to="/signin" className="btn-sign-in">Sign In</Link>
                        <Link to="/signup" className="btn-sign-up">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    </header>
    );
}

export default Navbar;