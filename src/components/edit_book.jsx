import { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';
import './styles/add_book.css';
import bookData from "../data/edit_book.json"; 
//I swear da Bog da mu djeca vozila unazad ko god je hardcodovao vrijednosti za ove stvari u laravelu!
const scripts = ['Cyrillic', 'Latin', 'Arabic'];
const bindings = ['Hardcover', 'Paperback', 'Spiral-bound'];
const dimensions = ['A1', 'A2', 'A3', '21cm x 29.7cm', '15cm x 21cm'];

const RenderEditBook = () => {
    const [activeSection, setActiveSection] = useState('basic');
    const [successMessage, setSuccessMessage] = useState('');
    const [nazivKnjiga, setNazivKnjiga] = useState('');
    const [kratkiSadrzaj, setKratkiSadrzaj] = useState('');
    const [categories, setCategories] = useState('');
    const [genres, setGenres] = useState('');
    const [authors, setAuthors] = useState('');
    const [publisher, setPublisher] = useState('');
    const [yearOfPublishing, setYearOfPublishing] = useState('');
    const [capacity, setCapacity] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [pismo, setPismo] = useState('');
    const [povez, setPovez] = useState('');
    const [format, setFormat] = useState('');
    const [isbn, setIsbn] = useState('');

   
    useEffect(() => {
        setNazivKnjiga(bookData.bookName || '');
        setKratkiSadrzaj(bookData.bookDescription || '');
        setCategories(bookData.category || '');
        setGenres(bookData.genre || '');
        setAuthors(bookData.author || '');
        setPublisher(bookData.publisher || '');
        setYearOfPublishing(bookData.publishingYear || '');
        setCapacity(bookData.capacity || '');
        setPageCount(bookData.noOfPages || '');
        setPismo(bookData.pismo || '');
        setPovez(bookData.povez || '');
        setFormat(bookData.format || '');
        setIsbn(bookData.isbn || '');
    }, []);

    const handleCancel = () => {
        setNazivKnjiga('');
        setKratkiSadrzaj('');
        setCategories('');
        setGenres('');
        setAuthors('');
        setPublisher('');
        setYearOfPublishing('');
        setCapacity('');
        setPageCount('');
        setPismo('');
        setPovez('');
        setFormat('');
        setIsbn('');
    };

    const handleSubmit = () => {
        setSuccessMessage('Knjiga sacuvana!');
        console.log({
            nazivKnjiga,
            kratkiSadrzaj,
            categories,
            genres,
            authors,
            publisher,
            yearOfPublishing,
            capacity,
            pageCount,
            pismo,
            povez,
            format,
            isbn
        });
    };

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
                                    <p><input type="text" value={nazivKnjiga} onChange={(e) => setNazivKnjiga(e.target.value)} required /></p>
                                </div>
                            </div>
                            <div className="add_book_text_area_bio">
                                <div className="add_book_text_area_bio_placeholder">
                                    <p>Kratki sadrzaj</p>
                                </div>
                                <div className="add_book_text_area_bio_input">
                                    <textarea value={kratkiSadrzaj} onChange={(e) => setKratkiSadrzaj(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="add_book_category_section">
                                <div className="add_book_category_placeholder">
                                    <p>Izaberite kategorije <span className="color_me_red_book">*</span></p>
                                </div>
                                <div className="add_book_category_input">
                                    <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} required />
                                </div>
                            </div>
                            <div className="add_book_genres_section">
                                <div className="add_book_genres_placeholder">
                                    <p>Izaberite zanrove <span className="color_me_red_book">*</span></p>
                                </div>
                                <div className="add_book_genres_input">
                                    <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required />
                                </div>
                            </div>

                            <div className="this_shit_goes_right">
                                <div className="add_book_author_section">
                                    <div className="add_book_author_placeholder">
                                        <p>Izaberite autore <span className="color_me_red_book">*</span></p>
                                    </div>
                                    <div className="add_book_author_input">
                                        <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
                                    </div>
                                    <div className="add_book_publisher_section">
                                        <div className="add_book_publisher_placeholder">
                                            <p>Izdavac <span className="color_me_red_book">*</span></p>
                                        </div>
                                        <div className="add_book_publisher_input">
                                            <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="add_book_year_of_publishing">
                                        <div className="add_book_year_of_publish_placeholder">
                                            <p>Godina izdavanja <span className="color_me_red_book">*</span></p>
                                        </div>
                                        <div className="add_book_year_of_publish_input">
                                            <input type="number" min="0" value={yearOfPublishing} onChange={(e) => setYearOfPublishing(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="add_book_capacity">
                                        <div className="add_book_capacity_placeholder">
                                            <p>Kolicina <span className="color_me_red_book">*</span></p>
                                        </div>
                                        <div className="add_book_capacity_input">
                                            <input type="number" min="0" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
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
                                <input type="text" value={pageCount} onChange={(e) => setPageCount(e.target.value)} />
                            </div>
                        </div>
                        <div className="add_book_specs_language_format">
                            <div className="add_book_specs_language_format_placeholder">
                                <p>Pismo <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_language_format_input">
                                <select value={pismo} onChange={(e) => setPismo(e.target.value)}>
                                    {scripts.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="add_book_specs_cover">
                            <div className="add_book_specs_cover_placeholder">
                                <p>Povez <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_cover_input">
                                <select value={povez} onChange={(e) => setPovez(e.target.value)}>
                                    {bindings.map((b) => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="add_book_specs_page_format">
                            <div className="add_book_specs_page_format_placeholder">
                                <p>Format <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_page_format_input">
                                <select value={format} onChange={(e) => setFormat(e.target.value)}>
                                    {dimensions.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="add_book_specs_isbn">
                            <div className="add_book_specs_isbn_placeholder">
                                <p>International Standard Book Num <span className="color_me_red_add_book_specs">*</span></p>
                            </div>
                            <div className="add_book_specs_isbn_input">
                                <input type="text" maxLength={13} value={isbn} onChange={(e) => setIsbn(e.target.value)} />
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
                        <h1>Izmjeni podatke</h1>
                    </div>
                    <div className="add_book_path">
                        <p>
                            <Link to="/all_books" className="route_to_all_books">Evidencija knjiga</Link> / <span className="this_goes_blue_as_well">Izmjeni podatke</span>
                        </p>
                    </div>
                </div>
                <div className="add_book_header_divider">
                    <hr />
                </div>

                <div className="add_book_page_select">
                    <button className={activeSection === 'basic' ? "page_button active_page" : "page_button"} onClick={() => setActiveSection('basic')}>
                        Osnovni detalji
                    </button>
                    <button className={activeSection === 'specs' ? "page_button active_page" : "page_button"} onClick={() => setActiveSection('specs')}>
                        Specifikacija
                    </button>
                    <button className={activeSection === 'multimedia' ? "page_button active_page" : "page_button"} onClick={() => setActiveSection('multimedia')}>
                        Multimedija
                    </button>
                </div>

                {renderSection()}

                {successMessage && <p className="success_message">{successMessage}</p>}

                <div className="add_book_buttons">
                    <button type="button" className="add_book_cancel_btn" onClick={handleCancel}>
                        Ponisti X
                    </button>
                    <button type="button" className="add_book_confirm_btn" onClick={handleSubmit}>
                        Sacuvaj ✓
                    </button>
                </div>
            </div>
        </>
    );
};

export default RenderEditBook;
