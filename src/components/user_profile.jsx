import { useEffect, useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import './styles/user_profile.css';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [message, setMessage] = useState(null); 

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(null), 3000);
    };

    const redirectUserprofileEmail = () => {
        if (userId) {
            navigate(`/user_profile/${userId}`);
        }
    };

    const openResetModal = () => {
        setShowResetModal(true);
    };

    const closeResetModal = () => {
        setShowResetModal(false);
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSavePassword = async () => {
        console.log("🔹 [handleSavePassword] Start reset password process");
        console.log("🔹 newPassword:", newPassword);
        console.log("🔹 confirmPassword:", confirmPassword);

        if (newPassword === '' || confirmPassword === '') {
            console.log("⚠️ [handleSavePassword] One or both password fields are empty.");
            showMessage('Molimo popunite oba polja.');
            return;
        }
        if (newPassword !== confirmPassword) {
            console.log("⚠️ [handleSavePassword] Passwords do not match.");
            showMessage('Lozinke se ne poklapaju!');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            console.log("🔹 Token from localStorage:", token);
            console.log(`🔹 Sending request to: http://0.0.0.0:80/api/users/${userId}?_method=PUT`);

            const response = await fetch(`http://0.0.0.0:80/api/users/${userId}?_method=PUT`, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassword,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    username: userData.username,
                    email: userData.email,
                    jmbg: userData.jmbg,
                    role_id: userData.role_id
                }),
            });
            // tooooooo napokon radi breeeeeeeeeeeeeeeeee 
            console.log("🔹 Response status:", response.status);

            if (!response.ok) {
                console.log("[handleSavePassword] Response not OK:", response);
                throw new Error('Error pri resetanju passwda.');
            }

            const result = await response.json();
            console.log("🔹 Response JSON:", result);

            if (result.status === 'success' || result.message?.toLowerCase().includes('uspjesno')) {
                console.log(` [handleSavePassword] Password reset successful for ${userData.first_name}`);
                showMessage(`Sifra korisnika ${userData.first_name} je uspjesno resetovana.`);
                closeResetModal();
            } else {
                console.log(" [handleSavePassword] Backend did not confirm success :(");
                showMessage('Doslo je do greske pri resetovanju lozinke');
            }
        } catch (error) {
            console.log("[handleSavePassword] Caught error:", error);
            showMessage('Error: ' + error.message);
        }
    };

    const handleDeleteUser = async () => {
        if (!window.confirm(`Da li ste sigurni da zelite obrisati korisnika ${userData.first_name} ${userData.last_name}?`)) {
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://0.0.0.0:80/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Doslo je do greske pri brisanju korisnika');
            }

            const result = await response.json();
            showMessage(result.message || 'Korisnik je uspjesno obrisan!');
            navigate('/all_users');
        } catch (error) {
            showMessage('Greska: ' + error.message);
        }
    };

    useEffect(() => {
        if (!userId || userId.trim() === '') {
            setUserData(null);
            navigate('/dashboard', { replace: true });
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            setUserData(null);

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://0.0.0.0:80/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    setUserData(null);
                    navigate('/dashboard', { replace: true });
                    return;
                }

                const result = await response.json();
                const user = result.data?.user || result.user || result.data;

                if (!user || user.role_id !== 1) {
                    setUserData(null);
                    navigate('/dashboard', { replace: true });
                    return;
                }

                setUserData(user);
            } catch (error) {
                setUserData(null);
                navigate('/dashboard', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId, navigate]);

    if (loading) {
        return (
            <>
                <Header />
                <Sidebar />
                <div className="fetching_user_content">
                    <h1>Ucitavanje podataka korisnika, molimo Vas pricekajte...</h1>
                </div>
            </>
        );
    }

    if (message) {
        return (
            <>
                <Header />
                <Sidebar />
                <div className="fetching_user_content">
                    <h1>{message}</h1>
                </div>
            </>
        );
    }

    if (!userData) {
        return (
            <>
                <Header />
                <Sidebar />
                <div className="userprofile_canvas">
                    <h1>User not found, redirecting to dashboard</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="userprofile_canvas">
                <div className="userprofile_header">
                    <div className="userprofile_name">
                        <h2>{`${userData.first_name} ${userData.last_name}`}</h2>
                    </div>
                    <div className="userprofile_path_location">
                        <p>
                            <Link to="/all_users" className="user_profile_all">Svi korisnici</Link> /{' '}
                            <Link to={`/user_profile/${userId}`} className="user_profile_single">{userData.id || 'user_id'}</Link>
                        </p>
                        <div className="user_profile_edit_reset_section">
                            <div className="user_profile_edit_user" onClick={() => navigate(`/edit_user/${userId}`)} style={{ cursor: 'pointer' }}>
                                <p>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425L2.25 12.9375ZM4.44 14.25H3.75V13.56L10.545 6.765L11.235 7.455L4.44 14.25ZM15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25C13.05 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.825 4.9875 15.825 4.515 15.5325 4.2225Z" fill="black" fillOpacity="0.6"/>
                                    </svg>
                                    Edit user
                                </p>
                            </div>
                            <div className="user_profile_reset_password" onClick={openResetModal} style={{ cursor: 'pointer' }}>
                                <p>
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 19H22L11 0L0 19ZM12 16H10V14H12V16ZM12 12H10V8H12V12Z" fill="black" fillOpacity="0.6"/>
                                    </svg>
                                    Reset password
                                </p>
                            </div>
                            <div className="user_profile_drop_down_menu" onClick={() => setShowDropdown(!showDropdown)}>
                                <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" fill="black" fillOpacity="0.6"/>
                                </svg>
                                {showDropdown && (
                                    <div className="dropdown_menu">
                                        <p onClick={handleDeleteUser}>🗑 Izbrisi korisnika</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="userprofile_selection">
                        <div className="userprofile_details">
                            <NavLink
                                to={`/user_profile/${userId}`}
                                className={({ isActive }) => (isActive ? 'current_selection' : '')}
                            >
                                Osnovni detalji
                            </NavLink>
                        </div>
                        <div className="userprofile_user_rented_books">
                            <NavLink
                                to={`/user_profile/${userId}/rented_books`}
                                className={({ isActive }) => (isActive ? 'current_selection' : '')}
                            >
                                Evidencija iznajmljivanja
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="userprofile_information">
                    <div className="userprofile_first_and_last_name">
                        <div className="useprofile_names_placeholder">
                            <p>Ime i prezime</p>
                        </div>
                        <div className="user_names">
                            <p>{`${userData.first_name} ${userData.last_name}`}</p>
                        </div>
                    </div>

                    <div className="userprofile_type">
                        <div className="userprofile_placeholder">
                            <p>Tip korisnika</p>
                        </div>
                        <div className="userprofile_type_student">
                            <p>Korisnik</p>
                        </div>
                    </div>

                    <div className="userprofile_jmbg">
                        <div className="userprofile_jmbg_placeholder">
                            <p>JMBG</p>
                        </div>
                        <div className="userprofile_user_jmbg">
                            <p>{userData.jmbg || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="userprofile_email">
                        <div className="userprofile_email_placeholder">
                            <p>Email</p>
                        </div>
                        <div className="userporfile_email_user">
                            <p onClick={redirectUserprofileEmail} style={{ cursor: 'pointer' }}>
                                {userData.email || 'Ne postoji'}
                            </p>
                        </div>
                    </div>

                    <div className="userprofile_count_login">
                        <div className="userprofile_count_login_placeholder">
                            <p>Broj logovanja</p>
                        </div>
                        <div className="userprofile_count_login_user">
                            <p>{userData.login_count || 60}</p>
                        </div>
                    </div>

                    <div className="userprofile_last_time_logged_in">
                        <div className="userprofile_last_time_logged_in_placeholder">
                            <p>Poslednji put logovan/a</p>
                        </div>
                        <div className="userprofile_last_time_logged_in_user">
                            <p>{userData.last_login || 'nema u db'}</p>
                        </div>
                    </div>

                    <div className="userprofile_picture">
                        <img
                            src="/assets/dashboard_images/profile_pic_dashboard.jpg"
                            alt="Profilna slika"
                            className="profile_pic"
                        />
                    </div>
                </div>
            </div>

            {showResetModal && (
                <div className="reset_modal_overlay">
                    <div className="reset_modal_content">
                        <div className="reset_modal_header">
                            <div className="reset_modal_reset_passwd_placeholder">
                                <h3>Resetuj šifru: {`${userData.first_name} ${userData.last_name}`}</h3>
                            </div>
                            <button onClick={closeResetModal} className="reset_modal_button">X</button>
                        </div>
                        <div className="reset_modal_header_divider">
                            <hr />
                        </div>
                        <div className="reset_modal_body_content">
                            <div className="reset_modal_input_passwd_section">
                                <div className="reset_modal_input_passwd_placeholder">
                                    <p>Unesi novu sifru <span className="color_me_red">*</span></p>
                                </div>
                                <div className="reset_modal_input_passwd_input">
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="reset_password_input"
                                    />
                                </div>
                                
                            </div>
                            <div className="reset_modal_input_passwd_repeat_section">
                                <div className="reset_modal_input_passwd_reset_placeholder">
                                    <p>Ponovi sifru <span className="color_me_red">*</span></p>
                                </div>

                                <div className="reset_modal_input_passwd_repeat_input">
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="reset_password_input"
                                    />
                                </div>
                            </div>
                            
                            <div className="reset_modal_buttons">
                                <button onClick={closeResetModal} className="close_modal_btn">Ponisti X</button>
                                <button onClick={handleSavePassword} className="save_password_btn">Sacuvaj ✓</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
