import Header from './header';
import Sidebar from './sidebar';
import './styles/new_genre.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RenderNewGenre = () => {
    const [genreName, setGenreName] = useState("");

    const handleCancel = () => {
        if (genreName.trim() !== "") {
            setGenreName("");
        }
    };

    const handleSave = () => {
        alert("Zanr je sacuvan!");
    };

    return(
        <>
            <Header />
            <Sidebar />
            <div className="new_genre_canvas">
                <div className="new_genre_header_section">
                    <div className="new_genre_main_title">
                        <h1>Novi zanr</h1>
                    </div>
                    <div className="new_genre_path">
                        <p> <Link to="/settings" className="settings_color_blue">Settings</Link> / <Link to="/settings_genres" className="settings_genres_color_blue">Zanrovi</Link> / <span className="color_me_gray">Novi zanr</span> </p>
                    </div>
                </div>

                <div className="new_genre_header_divider">
                    <hr />
                </div>

                <div className="new_genre_input_section_holder">
                    <div className="new_genre_placeholder">
                        <p>Naziv zanra <span className="color_me_red">*</span></p>
                    </div>
                    <div className="new_genre_input_field">
                        <input 
                            type="text" 
                            value={genreName} 
                            onChange={(e) => setGenreName(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="add_new_genre_buttons">
                    <button type="button" className="add_new_genre_cancel_btn" onClick={handleCancel}>
                        Ponisti X
                    </button>
                    <button type="button" className="add_new_genre_confirm_btn" onClick={handleSave}>
                        Sacuvaj ✓
                    </button>
                </div>
            </div>
        </>
        
    );
};

export default RenderNewGenre;
