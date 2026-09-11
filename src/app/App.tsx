import { useRef } from "react";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { storeAuthSession } from '../features/auth/auth-session';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';

function App() {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const inputForm = () => {
        inputRef.current?.focus();
    }

    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState('');
    const [loadingSignUp, setLoadingSignUp] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const showError = (message: string) => {
        setAlertMessage(message);
    };

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordSignUp !== confirmPasswordSignUp) {
            showError('Password and Confirm Password do not match');
            return;
        }

        setLoadingSignUp(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailSignUp, passwordSignUp }),
            });

            const data = await response.json();

            if (response.ok) {
                setAlertMessage('');
                setEmailSignUp('');
                setPasswordSignUp('');
                setConfirmPasswordSignUp('');
            } else {
                showError(data.error || 'Sign up failed.');
            }

        } catch (error) {
            console.error('Error signing up:', error);
            showError('An error occurred while signing up. Please try again.');
        } finally {
            setLoadingSignUp(false);
        }
    };

    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loadingSignIn, setLoadingSignIn] = useState(false);

    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoadingSignIn(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailSignIn, passwordSignIn }),
            });

            const data = await response.json();

            if (response.ok) {
                storeAuthSession(data.data.session, rememberMe);
                setAlertMessage('');
                navigate('/');
            } else {
                showError(data.error || 'Sign In failed.');
            }

        } catch (error) {
            console.error('Error signing :', error);
            showError('An error occurred while signing. Please try again.');
        } finally {
            setLoadingSignIn(false);
        }
    };

    return (
        <>
        {alertMessage && (
            <div className="custom-alert error" role="alert">
                <p>{alertMessage}</p>
            </div>
        )}
        <Routes>
            <Route path="/" element={
            <>
            <section className="hero">
                <div className="container-hero">
                    <h1 className="hero-slogan">Share your code, shape the web.</h1>
                    <p className="hero-sub">
                        Welcome to the ultimate open-source ecosystem designed for modern frontend
                        engineers and UI designers. We believe that building the web shouldn’t mean
                        reinventing the wheel. This is a collaborative playground where you can host,
                        share, and fork everything from vanilla HTML, CSS, and JavaScript to advanced
                        TypeScript, Tailwind classes, JSX/TSX layouts, and reusable framework
                        components. Connect with a global network of developers, showcase your design
                        systems, and collaborate in real-time to build a faster, more beautiful internet
                        together.
                    </p>
                    <form className="search-app" onClick={inputForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 1 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        <input ref={inputRef} type="text" placeholder="Search for components, styles, moder..."/>
                        <button type="submit" onClick={(e) => e.stopPropagation()}>Search</button>
                    </form>
                    <div className="hero-btn">
                        <a href="https://github.com/rhdev29/VerZyx-UI-Source" className="hero-btn-github" target="_blank" rel="noopener noreferrer">View On Github</a>
                        <button className="hero-btn-explore">Explore All Template</button>
                    </div>
                </div>
            </section>
            </>
            } />

            <Route path="/signin" element={
                <div className="sign-in">
                    <form className="sign-in-form" onSubmit={handleSignInSubmit}>
                        <h2 className="title-sign-in">Sign In</h2>
                        <input value={emailSignIn} onChange={(e) => setEmailSignIn(e.target.value)} type="email" placeholder="Email Address" required className="sign-in-input"/>
                        <input value={passwordSignIn} onChange={(e) => setPasswordSignIn(e.target.value)} type="password" placeholder="Password" required className="sign-in-input"/>
                        <label className="remember-me">
                            <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            <span>Remember me (forever)</span>
                        </label>
                        <button type="submit" disabled={loadingSignIn} className="btn-signin-submit">
                            {loadingSignIn ? 'Loading...' : 'Sign In'}
                        </button>
                        <div className="form-divider">
                            <div className="form-divider-line"></div>
                                <span className="form-divider-text">OR</span>
                            <div className="form-divider-line"></div>
                       </div>
                        <div className="auth">
                            <button className="btn-auth btn-google">
                                <svg className="auth-icon" viewBox="0 0 24 24" xmlns="http://w3.org" width={24} height={24}>
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                <span>Sign in with Google</span>
                            </button>

                            <button className="btn-auth btn-github">
                                <svg className="auth-icon" viewBox="0 0 24 24" xmlns="http://w3.org" width={24} height={24}>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#FFFFFF"/>
                                 </svg>
                                <span>Sign in with GitHub</span>
                            </button>
                        </div>
                    </form>
                </div>
            } />

            <Route path="/signup" element={
                <div className="sign-up">
                    <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
                        <h2 className="title-sign-up">Sign Up</h2>
                        <input value={emailSignUp} onChange={(e) => setEmailSignUp(e.target.value)} type="email" placeholder="Email Address" required className="sign-up-input"/>
                        <input value={passwordSignUp} onChange={(e) => setPasswordSignUp(e.target.value)} type="password" placeholder="Password" required className="sign-up-input"/>
                        <input value={confirmPasswordSignUp} onChange={(e) => setConfirmPasswordSignUp(e.target.value)} type="password" placeholder="Confirm Password" required className="sign-up-input"/>
                        <button type="submit" className="btn-signup-submit" disabled={loadingSignUp}>
                            {loadingSignUp ? 'Loading' : 'Sign Up'}
                        </button>
                        <div className="form-divider">
                            <div className="form-divider-line"></div>
                                <span className="form-divider-text">OR</span>
                            <div className="form-divider-line"></div>
                        </div>
                        <div className="auth">
                            <button className="btn-auth btn-google">
                                <svg className="auth-icon" viewBox="0 0 24 24" xmlns="http://w3.org" width={24} height={24}>
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                <span>Sign in with Google</span>
                            </button>

                            <button className="btn-auth btn-github">
                                <svg className="auth-icon" viewBox="0 0 24 24" xmlns="http://w3.org" width={24} height={24}>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#FFFFFF"/>
                                </svg>
                                <span>Sign in with GitHub</span>
                            </button>
                        </div>
                    </form>
                </div>
            } />
        </Routes>
        </>
    );
}

export default App;