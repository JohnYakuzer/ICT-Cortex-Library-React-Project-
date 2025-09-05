import Header from './header';
import Sidebar from './sidebar';
import { NavLink } from 'react-router-dom';
import './styles/add_book_multimedia.css';

const RenderAddBookMultimedia = () => {
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
                    <NavLink
                        to="/add_book"
                        className={({ isActive }) =>
                            isActive ? "page_button active_page" : "page_button"
                        }
                    >
                        Osnovni detalji
                    </NavLink>
                    <NavLink
                        to="/add_book_specs"
                        className={({ isActive }) =>
                            isActive ? "page_button active_page" : "page_button"
                        }
                    >
                        Specifikacija
                    </NavLink>
                    <NavLink
                        to="/add_book_multimedia"
                        className={({ isActive }) =>
                            isActive ? "page_button active_page" : "page_button"
                        }
                    >
                        Multimedija
                    </NavLink>
                </div>

                <div className="add_photo_container">
                    <img src="/assets/add_photo_ph/add_photo_picture.png" alt="nzm add slika valjda" className="add_mm_photo" />
                </div>

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

export default RenderAddBookMultimedia;
