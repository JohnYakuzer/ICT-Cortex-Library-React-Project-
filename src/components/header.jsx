

import React, { useState } from 'react';
import classes from './styles/header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const [profileDropMenu, setProfileDropMenu] = useState(false)
    const [addDropMenu, setAddDropMenu] = useState(false)

    const profileDropMenuHandler = () => {
        setProfileDropMenu(!profileDropMenu)
        setAddDropMenu(false)
    }

    const addDropMenuHandler = () => {
        setAddDropMenu(!addDropMenu)
        setProfileDropMenu(false)
    }

    //Dodao sam da redirecta na login i dashboard - Redzep
    const redirectLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const redirectDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <header>
                <a className={classes['dashboard-link']} onClick={redirectDashboard}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_206_18920)">
                            <path d="M37.6561 21.3738V17.6567C37.6561 17.0095 37.1314 16.4848 36.4842 16.4848C34.0633 16.4848 31.8063 16.6891 29.6738 17.1063C28.4308 15.9059 26.9154 15.035 25.2744 14.5589C27.0638 13.0529 28.203 10.798 28.203 8.28169C28.203 3.71537 24.5231 0.000457764 19.9999 0.000457764C15.4767 0.000457764 11.7968 3.71537 11.7968 8.28169C11.7968 10.798 12.936 13.0529 14.7254 14.5589C13.0844 15.035 11.569 15.9059 10.326 17.1062C8.19358 16.6891 5.93655 16.4847 3.51562 16.4847C2.86843 16.4847 2.34375 17.0094 2.34375 17.6566V21.3738C0.979764 21.8575 0 23.1601 0 24.6878V27.0316C0 28.5593 0.979764 29.8619 2.34375 30.3456V34.0628C2.34375 34.71 2.86843 35.2347 3.51562 35.2347C9.64287 35.2347 14.6743 36.6865 19.35 39.8035C19.7418 40.0646 20.2579 40.0652 20.65 39.8035C25.3257 36.6865 30.3571 35.2347 36.4844 35.2347C37.1316 35.2347 37.6563 34.71 37.6563 34.0628V30.3456C39.0202 29.8619 40 28.5593 40 27.0316V24.6878C39.9998 23.1602 39.0201 21.8576 37.6561 21.3738ZM14.1405 8.28169C14.1405 5.00771 16.769 2.3442 19.9999 2.3442C23.2307 2.3442 25.8592 5.00771 25.8592 8.28169C25.8592 11.5125 23.2307 14.1411 19.9999 14.1411C16.769 14.1411 14.1405 11.5125 14.1405 8.28169ZM3.51554 28.2035C2.86937 28.2035 2.34367 27.6778 2.34367 27.0316V24.6879C2.34367 24.0417 2.86937 23.516 3.51554 23.516C4.16171 23.516 4.68741 24.0417 4.68741 24.6879V27.0316C4.68741 27.6778 4.16171 28.2035 3.51554 28.2035ZM18.828 36.7258C14.5739 34.2929 10.0088 33.0633 4.68741 32.9079V30.3457C6.05139 29.8619 7.03116 28.5594 7.03116 27.0316V24.6879C7.03116 23.1602 6.05139 21.8576 4.68741 21.3738V18.8451C10.1937 19.0031 14.6197 20.2998 18.828 22.9792V36.7258ZM19.9999 20.9488C17.8369 19.584 15.5855 18.5449 13.1821 17.8146C14.5027 16.9564 16.0573 16.4848 17.6561 16.4848H22.3436C23.9425 16.4848 25.4971 16.9564 26.8177 17.8146C24.4142 18.5449 22.1628 19.584 19.9999 20.9488ZM35.3124 32.9079C29.991 33.0633 25.4258 34.2932 21.1718 36.7259V22.9801C25.3801 20.3005 29.8058 19.0031 35.3124 18.8451V21.3738C33.9484 21.8576 32.9686 23.1602 32.9686 24.6879V27.0316C32.9686 28.5594 33.9484 29.8619 35.3124 30.3457V32.9079ZM37.6561 27.0316C37.6561 27.6778 37.1304 28.2035 36.4842 28.2035C35.8381 28.2035 35.3124 27.6778 35.3124 27.0316V24.6879C35.3124 24.0417 35.8381 23.516 36.4842 23.516C37.1304 23.516 37.6561 24.0417 37.6561 24.6879V27.0316Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_206_18920">
                                <rect width="40" height="40" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    Online Biblioteka
                </a>
                <div className={classes.headerNav}>
                    <div className={classes.notifications}>
                        <p className={classes.notificationNum}>12</p>
                        <a className={classes.svgHolder}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 22C13.6 22 14.5 21.1 14.5 20H10.5C10.5 21.1 11.4 22 12.5 22ZM18.5 16V11C18.5 7.93 16.87 5.36 14 4.68V4C14 3.17 13.33 2.5 12.5 2.5C11.67 2.5 11 3.17 11 4V4.68C8.14 5.36 6.5 7.92 6.5 11V16L4.5 18V19H20.5V18L18.5 16ZM16.5 17H8.5V11C8.5 8.52 10.01 6.5 12.5 6.5C14.99 6.5 16.5 8.52 16.5 11V17Z" fill="white" />
                            </svg>
                        </a>
                    </div>
                    <div className={classes.divider}></div>
                    <div onClick={addDropMenuHandler} className={classes.svgHolder}>
                        <svg className={classes.addSvg} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5 13H13.5V18C13.5 18.55 13.05 19 12.5 19C11.95 19 11.5 18.55 11.5 18V13H6.5C5.95 13 5.5 12.55 5.5 12C5.5 11.45 5.95 11 6.5 11H11.5V6C11.5 5.45 11.95 5 12.5 5C13.05 5 13.5 5.45 13.5 6V11H18.5C19.05 11 19.5 11.45 19.5 12C19.5 12.55 19.05 13 18.5 13Z" fill="white" />
                        </svg>
                        {addDropMenu && <ul className={classes.dropMenu}>
                            <li>
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z" fill="black" fill-opacity="0.6" />
                                    </svg>
                                    Bibliotekar
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12.75C13.63 12.75 15.07 13.14 16.24 13.65C17.32 14.13 18 15.21 18 16.38V17C18 17.55 17.55 18 17 18H7C6.45 18 6 17.55 6 17V16.39C6 15.21 6.68 14.13 7.76 13.66C8.93 13.14 10.37 12.75 12 12.75ZM4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V17C0 17.55 0.45 18 1 18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H23C23.55 18 24 17.55 24 17V16.43ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6Z" fill="black" fill-opacity="0.6" />
                                    </svg>
                                    Ucenik
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" fill="black" fill-opacity="0.6" />
                                        <path d="M17.5 10.5C18.38 10.5 19.23 10.59 20 10.76V9.24C19.21 9.09 18.36 9 17.5 9C15.8 9 14.26 9.29 13 9.83V11.49C14.13 10.85 15.7 10.5 17.5 10.5Z" fill="black" fill-opacity="0.6" />
                                        <path d="M13 12.49V14.15C14.13 13.51 15.7 13.16 17.5 13.16C18.38 13.16 19.23 13.25 20 13.42V11.9C19.21 11.75 18.36 11.66 17.5 11.66C15.8 11.66 14.26 11.96 13 12.49Z" fill="black" fill-opacity="0.6" />
                                        <path d="M17.5 14.33C15.8 14.33 14.26 14.62 13 15.16V16.82C14.13 16.18 15.7 15.83 17.5 15.83C18.38 15.83 19.23 15.92 20 16.09V14.57C19.21 14.41 18.36 14.33 17.5 14.33Z" fill="black" fill-opacity="0.6" />
                                    </svg>
                                    Knjiga
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z" fill="black" fill-opacity="0.6" />
                                    </svg>
                                    Autor
                                </a>
                            </li>
                        </ul>}
                    </div>
                    <a href='https://www.bild-studio.com/' className={classes.bildLogo}>bildstudio</a>
                    <div onClick={profileDropMenuHandler} className={classes.profilePicture}>
                        <img src='https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=is&k=20&c=Q8iMD_9uRR1rjGUC4Ua06aNPtwsfZH1ymzU14pJ3Ff8=' />
                        {profileDropMenu && <ul className={classes.dropMenu}>
                            <div className="profile_component">
                                <li>
                                    <a>
                                        <svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z"></path>
                                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"></path>
                                        </svg>
                                        Profile
                                    </a>
                                </li>
                            </div>

                            <div className="logout_component">
                                <li>
                                    <a onClick={redirectLogout} className={classes.dropdownItem} style={{ cursor: 'pointer' }}>
                                        <svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"></path>
                                        </svg>
                                        Logout
                                    </a>
                                </li>
                            </div>
                        </ul>}
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header;