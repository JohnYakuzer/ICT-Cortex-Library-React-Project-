import Header from './header';
import Sidebar from './sidebar';
import { NavLink } from 'react-router-dom';
import './styles/book_information.css';

const BookInformationSpecs = () => {
    return(
        <>
            <Header />
            <Sidebar />
            <div className="book_info_canvas">
                <div className="book_info_header">
                    <div className="book_cover_pic">
                        <img src="/assets/book_cover/book_cover.jpg" alt="book cover" className="book_cover_image" />
                    </div>
                    <div className="book_info_texts">
                        <div className="book_name_and_pic">
                            <div className="book_name">
                                <h1>Ime Knjige</h1>
                            </div>
                        </div>
                        <div className="book_info_path">
                            <p>Evidencija knjiga / ID_knjige</p>
                        </div>
                    </div>
                </div>

                <div className="book_info_header_divider">
                    <hr />
                </div>

                <div className="book_info_page_select">
                    <NavLink
                        to="/book_information"
                        className={({ isActive }) =>
                            isActive ? "page_button active_page" : "page_button"
                        }
                    >
                        Osnovni detalji
                    </NavLink>
                    <NavLink
                        to="/book_information_specs"
                        className={({ isActive }) =>
                            isActive ? "page_button active_page" : "page_button"
                        }
                    >
                        Specifikacija
                    </NavLink>
                    <NavLink
                        to="/rental_records"
                        className={({ isActive }) =>
                            isActive ? "page_button active_page" : "page_button"
                        }
                    >
                        Evidencija iznajmljivanja
                    </NavLink>
                    <NavLink
                        to="/book_information_multimedia"
                        className={({ isActive }) =>
                            isActive ? "page_button active_page" : "page_button"
                        }
                    >
                        Multimedija
                    </NavLink>
                </div>
                        



                <div className="book_info_fetch_section">
                    <div className="book_info_page_count">
                        <div class="book_info_page_count_placeholder">
                            <p>Broj strana</p>
                        </div>
                        <div class="book_info_page_count_fetch">
                            <p>broj strana ide odje</p>
                        </div>
                        <div class="book_info_page_language_format">
                            <div class="book_info_page_language_format_placeholder">
                                <p>Pismo</p>
                            </div>
                            <div className="book_info_page_language_format_fetch">
                                <p>Odje ide pismo</p>
                            </div>
                        </div>
                        <div class="book_info_page_language">
                            <div class="book_info_page_language_placeholder">
                                <p>Jezik</p>
                            </div>
                            <div class="book_info_page_language_fetch">
                                <p>Odje ide jezik</p>
                            </div>
                        </div>
                        <div className="book_info_cover">
                            <div class="book_info_cover_placeholder">
                                <p>Povez</p>
                            </div>
                            <div class="book_info_cover_fetch">
                                <p>Odje ide povez</p>
                            </div>
                        </div>
                        <div class="book_info_format">
                            <div class="book_info_format_placeholder">
                                <p>Format</p>
                            </div>
                            <div class="book_info_format_fetch">
                                <p>odje ide format u cm</p>
                            </div>
                        </div>
                        <div class="book_info_isbn">
                            <div class="book_info_isbn_placeholder">
                                <p>International Standard Book Number (ISBN)</p>
                            </div>
                            <div class="book_info_isbn_fetch">
                                <p>odje ide isbn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default BookInformationSpecs;

