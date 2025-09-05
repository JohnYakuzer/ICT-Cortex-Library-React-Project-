import Header from './header';
import Sidebar from './sidebar';
import './styles/new_category.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RenderNewCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [bio, setBio] = useState("");

    const handleCancel = () => {
        if (categoryName.trim() !== "" || bio.trim() !== "") {
            setCategoryName("");
            setBio("");
        }
    };

    const handleSave = () => {
        alert("Kategorija je sacuvana!");
    };

    return(
        <>
            <Header />
            <Sidebar />
            <div className="new_category_canvas">
                <div className="new_category_header_section">
                    <div className="new_category_main_title">
                        <h1>Nova kategorija</h1>
                    </div>
                    <div className="new_category_path">
                        <p> <Link to="/settings" className="settings_color_blue">Settings</Link> / <Link to="/settings_categories" className="settings_category_color_blue">Kategorija</Link> / <span className="color_me_gray">Nova kategorija</span> </p>
                    </div>
                </div>

                <div className="new_category_header_divider">
                    <hr />
                </div>

                <div className="new_category_input_section_holder">
                    <div className="new_category_placeholder">
                        <p>Naziv pisma <span className="color_me_red">*</span></p>
                    </div>
                    <div className="new_category_input_field">
                        <input 
                            type="text" 
                            value={categoryName} 
                            onChange={(e) => setCategoryName(e.target.value)} 
                        />
                    </div>
                    
                    <div className="new_category_add_icon">
                        <div className="new_category_add_icon_title">
                            <p>Uploaduj ikonicu</p>
                        </div>
                        <div className="new_category_add_icon_input">
                            <button>Browse...</button>
                        </div>
                    </div>

                    <div className="new_category_bio_seciton">
                        <div className="new_category_bio_title_placeholder">
                            <p>Opis</p>
                        </div>
                        <div className="new_category_bio_text_area">
                            <textarea 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                        </div>
                        
                    </div>
                </div>

                <div className="add_new_category_buttons">
                    <button type="button" className="add_new_category_cancel_btn" onClick={handleCancel}>
                        Ponisti X
                    </button>
                    <button type="button" className="add_new_category_confirm_btn" onClick={handleSave}>
                        Sacuvaj ✓
                    </button>
                </div>
            </div>
        </>
        
    );
};

export default RenderNewCategory;
