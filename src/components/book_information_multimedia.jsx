import Header from './header';
import Sidebar from './sidebar';
import { NavLink } from 'react-router-dom';
import './styles/book_information_multimedia.css';

const BookInformationMultimedia = () => {
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
                <div className="book_info_multimedia_content">
                    <div className="book_info_multimedia_add_cover_photo">
                        <img src="/assets/add_photo_ph/add_photo_picture.png" alt="slika za add photo" className="book_info_add_photo" />
                    </div>
                </div>

                <div className="book_info_cover_photos">
                    <div className="book_info_cover_photo_container">
                        <img src="/assets/book_cover/book_cover.jpg" alt="book cover photo x" className="book_cover_photo" />
                        <input type="radio" className="cover_radio" />
                        <div className="cover_watermark">
                            <p>book_cover.jpg</p>
                            <p>2.4 MB</p>
                        </div>
                    </div>
                    <div className="book_info_cover_photo_container">
                        <img src="/assets/book_cover/book_cover_v2.jpg" alt="book cover photo y" className="book_cover_photo" />
                        <input type="radio" className="cover_radio" />
                        <div className="cover_watermark">
                            <p>book_cover_v2.jpg</p>
                            <p>3.1 MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookInformationMultimedia;
