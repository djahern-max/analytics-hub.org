// components/Layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';  // Use the hook instead
import styles from './Header.module.css';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();  // Use the hook

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">Analytics Hub</Link>
                </div>

                <nav className={styles.nav}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
                            <Link to="/websites" className={styles.navLink}>Websites</Link>
                            <button onClick={logout} className={styles.navButton}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.navLink}>Login</Link>
                            <Link to="/register" className={styles.navButton}>Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;