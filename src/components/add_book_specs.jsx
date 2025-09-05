import { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { NavLink } from 'react-router-dom';
import './styles/add_book.css';
import './styles/add_book_specs.css';
import './styles/add_book_multimedia.css';

const RenderAddBook = () => {
    const [activeSection, setActiveSection] = useState('basic');

    const renderSection = () => {
        switch(activeSection) {
            case 'basic':
                return (
                    <div className="add_book_specs">
                        <div className="add_book_name_section">
                            <div className="add_book_title">
                                <div className="add_book_title_placeholder">
                                    <p>Naziv knjige <span className="color_me_red_book">*</span></p>
                                </div>
                                <div className="add_book_name_input">
                                    <p><input type="text" /></p>
                                </div>
                            </div>
                            <div className="add_book_text_area_bio">
                                <div className="add_book_text_area_bio_placeholder">
                                    <p>Kratki sadrzaj</p>
                                </div>
                                <div className="add_book_text_area_bio_input">
                                    <textarea></textarea>
                                </div>
                            </div>
                            <div className="add_book_category_section">
                                <div className="add_book_category_placeholder">
                                    <p>Izaberite kategorije <span className="color_me_red_book">*</span></p>
                                </div>
                                <div className="add_book_category_input">
                                    <input type="text" placeholder="Unesite kategoriju" />
                                </div>
                            </div>
                            <div className="add_book_genres_section">
                                <div className="add_book_genres_placeholder">
                                    <p>Izaberite zanrove <span className="color_me_red_book">*</span></p>
                                </div>
                                <div className="add_book_genres_input">
                                    <input type="text" placeholder="Unesite žanr" />
                                </div>
                            </div>

                            <div className="this_shit_goes_right">
                                <div className="add_book_author_section">
                                    <div className="add_book_author_placeholder">
                                        <p>Izaberite autore <span className="color_me_red_book">*</span></p>
                                    </div>
                                    <div className="add_book_author_input">
                                        <input type="text" placeholder="Unesite autore" />
                                    </div>
                                    <div className="add_book_publisher_section">
                                        <div className="add_book_publisher_placeholder">
                                            <p>Izdavac <span className="color_me_red_book">*</span></p>
                                        </div>
                                        <div className="add_book_publisher_input">
                                            <input type="text" placeholder="Unesite izdavača" />
                                        </div>
                                    </div>
                                    <div className="add_book_year_of_publishing">
                                        <div className="add_book_year_of_publish_placeholder">
                                            <p>Godina izdavanja <span className="color_me_red_book">*</span></p>
                                        </div>
                                        <div className="add_book_year_of_publish_input">
                                            <input type="number" placeholder="Unesite godinu" />
                                        </div>
                                    </div>
                                    <div className="add_book_capacity">
                                        <div className="add_book_capacity_placeholder">
                                            <p>Kolicina <span className="color_me_red_book">*</span></p>
                                        </div>
                                        <div className="add_book_capacity_input">
                                            <input type="number"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'specs':
                return (
                    <div className="add_book_specs_info">
                        <div className="add_book_specs_page_count">
                            <div className="add_book_specs_page_count_placeholder">
                                <p>Broj strana <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_page_count_input">
                                <input type="text"></input>
                            </div>
                        </div>
                        <div className="add_book_specs_language_format">
                            <div className="add_book_specs_language_format_placeholder">
                                <p>Pismo <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_language_format_input">
                                <input type="text"></input>
                            </div>
                        </div>
                        <div className="add_book_specs_cover">
                            <div className="add_book_specs_cover_placeholder">
                                <p>Povez <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_cover_input">
                                <input type="text"></input>
                            </div>
                        </div>
                        <div className="add_book_specs_page_format">
                            <div className="add_book_specs_page_format_placeholder">
                                <p>Format <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_page_format_input">
                                <input type="text"></input>
                            </div>
                        </div>
                        <div className="add_book_specs_isbn">
                            <div className="add_book_specs_isbn_placeholder">
                                <p>Iternational Standard Book Num <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_isbn_input">
                                <input type="text"></input>
                            </div>
                        </div>
                    </div>
                );
            case 'multimedia':
                return (
                    <div className="add_photo_container">
                        <img src="/assets/add_photo_ph/add_photo_picture.png" alt="nzm add slika valjda" className="add_mm_photo" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <div className="add_book_canvas">
                <div className="add_book_header">
                    <div className="add_book_title_conatainer">
                        <h1>Nova knjiga</h1>
                    </div>
                    <div className="add_book_path">
                        <p>Evidencija knjiga / Nova knjiga</p>
                    </div>
                </div>
                <div className="add_book_header_divider">
                    <hr />
                </div>

                <div className="add_book_page_select">
                    <button 
                        className={activeSection === 'basic' ? "page_button active_page" : "page_button"} 
                        onClick={() => setActiveSection('basic')}
                    >
                        Osnovni detalji
                    </button>
                    <button 
                        className={activeSection === 'specs' ? "page_button active_page" : "page_button"} 
                        onClick={() => setActiveSection('specs')}
                    >
                        Specifikacija
                    </button>
                    <button 
                        className={activeSection === 'multimedia' ? "page_button active_page" : "page_button"} 
                        onClick={() => setActiveSection('multimedia')}
                    >
                        Multimedija
                    </button>
                </div>

                {renderSection()}

                <div className="add_book_buttons">
                    <button type="button" className="add_book_cancel_btn">
                        Ponisti X
                    </button>
                    <button type="button" className="add_book_confirm_btn">
                        Sacuvaj ✓
                    </button>
                </div>
            </div>
        </>
    );
};

export default RenderAddBook;
