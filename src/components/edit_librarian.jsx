import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import './styles/edit_librarian.css';

const EditUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [fullName, setFullName] = useState('');
    const [jmbg, setJmbg] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); 

    // Nesto sam odje htio da commentam, nzm sta, posle cu se sjetiti
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://0.0.0.0:80/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const data = await response.json();
                if (response.ok && data.status === 'success') {
                    const user = data.data;
                    setFullName(`${user.first_name} ${user.last_name}`);
                    setJmbg(user.jmbg || '');
                    setEmail(user.email || '');
                    setUsername(user.username || '');
                } else {
                    setError(data.message || 'Greska prilikom ucitavanja bibliotekara');
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Server opet');
            }
        };

        fetchUser();
    }, [userId]);

    const handleConfirm = async () => {
        setError(null);
        setSuccessMessage(null);

        if (!fullName.trim()) {
            setError('Ime i prezime ne smije biti prazno!');
            return;
        }
        if (!jmbg.trim() || jmbg.length !== 13) {
            setError('JMBG mora imati 13 cifara!');
            return;
        }
        if (!email.trim()) {
            setError('Email polje ne smije biti prazno!');
            return;
        }
        if (!username.trim()) {
            setError('Ime bibliotekara ne smije biti prazno!');
            return;
        }
        if (password && password !== passwordRepeat) {
            setError('Sifre se ne poklapaju!');
            return;
        }

        const nameParts = fullName.trim().split(' ');
        const first_name = nameParts.shift();
        const last_name = nameParts.join(' ') || '';

        const updatedUser = {
            first_name,
            last_name,
            username,
            email,
            jmbg,
            role_id: 2
        };

        if (password) {
            updatedUser.password = password;
            updatedUser.password_confirmation = passwordRepeat;
        }

        try {
            const response = await fetch(`http://0.0.0.0:80/api/users/${userId}?_method=PUT`, {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedUser)
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setSuccessMessage('User successfully updated, redirecting to user list...');
                setTimeout(() => {
                    navigate('/all_users');
                }, 2000); 
            } else {
                setError(data.message || 'Greska prilikom azuriranja bibliotekara');
            }
        } catch (error) {
            console.error('Failed to update librarian:', error);
            setError('at this point, msm da se samo backend zajebava sa mnom');
        }
    };

    const handleCancel = () => {
        navigate('/all_users');
    };

    return (
        <>
            <Header />
            <Sidebar />

            <div className="add_user_canvas">
                <div className="add_user_header">
                    <div className="add_user_title">
                        <h1>Izmjeni bibliotekara</h1>
                    </div>
                    <div className="add_user_path">
                        <p>
                            <Link to="/all_librarians" className="author_evid">Svi bibliotekari</Link> / <span className="author_id_ph">Izmjeni podatke</span>
                        </p>
                    </div>
                </div>

                <div className="add_user_header_divider">
                    <hr />
                </div>

                <div className="add_user_information">
                    <div className="add_user_field">
                        <p className="add_user_label">Ime i prezime <span className="add_user_required">*</span></p>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="add_user_input"
                        />
                    </div>

                    <div className="add_user_field">
                        <p className="add_user_label">Tip korisnika</p>
                        <select disabled className="add_user_select">
                            <option>Bibliotekar</option>
                        </select>
                    </div>

                    <div className="add_user_field">
                        <p className="add_user_label">JMBG <span className="add_user_required">*</span></p>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={13}
                            value={jmbg}
                            onChange={(e) => setJmbg(e.target.value.replace(/\D/g, '').slice(0, 13))}
                            className="add_user_input"
                        />
                    </div>

                    <div className="add_user_field">
                        <p className="add_user_label">E-mail <span className="add_user_required">*</span></p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="add_user_input"
                        />
                    </div>

                    <div className="add_user_field">
                        <p className="add_user_label">Korisnicko ime <span className="add_user_required">*</span></p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="add_user_input"
                        />
                    </div>

                    <div className="add_user_field">
                        <p className="add_user_label">Sifra</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="add_user_input"
                        />
                    </div>

                    <div className="add_user_field">
                        <p className="add_user_label">Ponovi sifru</p>
                        <input
                            type="password"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            className="add_user_input"
                        />
                    </div>

                    {error && (
                        <div className="add_user_error">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="add_user_success">
                            {successMessage}
                        </div>
                    )}
                </div>

                <div className="add_user_buttons">
                    <button type="button" onClick={handleCancel} className="add_user_cancel_btn">
                        Ponisti X
                    </button>
                    <button type="button" onClick={handleConfirm} className="add_user_confirm_btn">
                        Sacuvaj ✓
                    </button>
                </div>

                <div className="add_user_photo_section">
                    <div className="add_photo_placeholder">
                        <img src="/assets/dashboard_images/profile_pic_dashboard.jpg" alt="add_photo" className="ph_pic" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUser;
