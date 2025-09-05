import Header from './header';
import Sidebar from './sidebar';
import './styles/new_format_letter.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RenderNewFormatLetter = () => {
    const [formatLetterName, setFormatLetterName] = useState("");

    const handleCancel = () => {
        if (formatLetterName.trim() !== "") {
            setFormatLetterName("");
        }
    };

    const handleSave = () => {
        alert("Pismo je sacuvano!");
    };

    return(
        <>
            <Header />
            <Sidebar />
            <div className="new_format_letter_canvas">
                <div className="new_format_letter_header_section">
                    <div className="new_format_letter_main_title">
                        <h1>Novo pismo</h1>
                    </div>
                    <div className="new_format_letter_path">
                        <p> <Link to="/settings" className="settings_color_blue">Settings</Link> / <Link to="/settings_letter_format" className="settings_format_letter_color_blue">Pismo</Link> / <span className="color_me_gray">Novo pismo</span> </p>
                    </div>
                </div>

                <div className="new_format_letter_header_divider">
                    <hr />
                </div>

                <div className="new_format_letter_input_section_holder">
                    <div className="new_format_letter_placeholder">
                        <p>Naziv pisma <span className="color_me_red">*</span></p>
                    </div>
                    <div className="new_format_letter_input_field">
                        <input 
                            type="text" 
                            value={formatLetterName} 
                            onChange={(e) => setFormatLetterName(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="add_new_format_letter_buttons">
                    <button type="button" className="add_new_format_letter_cancel_btn" onClick={handleCancel}>
                        Ponisti X
                    </button>
                    <button type="button" className="add_new_format_letter_confirm_btn" onClick={handleSave}>
                        Sacuvaj ✓
                    </button>
                </div>
            </div>
        </>
        
    );
};

export default RenderNewFormatLetter;
