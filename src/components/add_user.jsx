import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import './styles/add_users.css';

const RenderAddUser = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [jmbg, setJmbg] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); 

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
            setError('Korisnicko ime ne smije biti prazno!');
            return;
        }
        if (!password) {
            setError('Sifra ne smije biti prazna!');
            return;
        }
        if (!passwordRepeat.trim()) {
            setError('Morate ponovo unijeti sifru!');
            return;
        }
        if (password !== passwordRepeat) {
            setError('Sifre se ne poklapaju!');
            return;
        }

        const nameParts = fullName.trim().split(' ');
        const first_name = nameParts.shift();
        const last_name = nameParts.join(' ') || '';

        const newUser = {
            first_name,
            last_name,
            username,
            email,
            jmbg,
            password,
            password_confirmation: passwordRepeat,
            role_id: 1
        };

        try {
            const response = await fetch('http://0.0.0.0:80/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setSuccessMessage('User successfully added, redirecting to user list...');
                setTimeout(() => {
                    navigate('/all_users');
                }, 2000); 
            } else {
                setError(data.message || 'Greska prilikom kreiranja korisnika');
            }
        } catch (error) {
            console.error('Failed to create user:', error);
            setError('Greska prilikom konekcije sa serverom');
        }
    };

    const handleCancel = () => {
        setFullName('');
        setJmbg('');
        setEmail('');
        setUsername('');
        setPassword('');
        setPasswordRepeat('');
        setError(null);
        setSuccessMessage(null);
    };

    return (
        <>
            <Header />
            <Sidebar />

            <div className="add_user_canvas">
                <div className="add_user_header">
                    <div className="add_user_title">
                        <h1>Novi korisnik</h1>
                    </div>
                    <div className="add_user_path">
                        <p>
                            <Link to="/all_users" className="author_evid">Svi korisnici</Link> / <span className="author_id_ph">Novi ucenik</span>
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
                            <option>Ucenik</option>
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
                        <p className="add_user_label">Sifra <span className="add_user_required">*</span></p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="add_user_input"
                        />
                    </div>

                    <div className="add_user_field">
                        <p className="add_user_label">Ponovi sifru <span className="add_user_required">*</span></p>
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
                        <img src="/assets/add_photo_ph/add_photo_picture.png" alt="add_photo" className="ph_pic" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RenderAddUser;
