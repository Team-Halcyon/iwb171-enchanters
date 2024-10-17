import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/styles.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState(null);
    const navBtn = useRef(null);

    const toggleMenu = () => {
        setShowNav(!showNav);
    };

    useEffect(() => {
        if (!navBtn) return;

        const handleClick = (e) => {
            if (navBtn.current && !navBtn.current.contains(e.target)) {
                setShowNav(false);
            }
        };
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [navBtn]);

    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);  
            } else {
                setUser(null);  
            }
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <>
            <Link to="home" style={{ zIndex: 10 }}>
                <div className={styles.logo} style={{ zIndex: 10 }}>
                    <img src="/logo.jpg" alt="Logo" />
                </div>
            </Link>
            <i
                className={`bx bx-menu ${styles.menuIcon}`}
                ref={navBtn}
                style={{ zIndex: 10 }}
                id="menu_icon"
                onClick={toggleMenu}
            ></i>
            <ul
                className={styles.navbar}
                style={{ top: `${showNav ? '70px' : '-570px'}`, zIndex: 5 }}
            >
                <li><Link to="home">Home</Link></li>
                <li><a href="/home#about">About us</a></li>
                <li><a href="/home#projects">Projects</a></li>
                <li><Link to="helpPage">Help</Link></li>
                <li><Link to="login">Log In</Link></li>
            </ul>

            <div className={styles.userprof}>
                <button
                    className={styles.userproficon}
                    disabled={!user}  
                    onClick={() => {
                        if (user) {
                            window.location.href = '/userProfile';
                            console.log("User Profile Access");
                        }
                    }}
                >
                    <i className='bx bx-user-circle'></i>
                </button>
            </div>
        </>
    );
};

export default Navbar;

