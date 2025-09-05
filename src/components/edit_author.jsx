import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import './styles/edit_author.css';


const EditAuthor = () => {
    const { authorId } = useParams(); 
    const [fullName, setFullName] = useState('');
    const richTextRef = useRef(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`http://0.0.0.0:80/api/authors/${authorId}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                    }
                });
                const data = await response.json();
                if (data.status === 'success') {
                    const author = data.data;
                    setFullName(`${author.first_name} ${author.last_name}`);
                    if (richTextRef.current) {
                        richTextRef.current.innerHTML = author.biography || '';
                    }
                }
            } catch (error) {
                console.error('Greska pri ucitavanju autora:', error);
            }
        };

        if (authorId) fetchAuthor();
    }, [authorId]);

    const handleCommand = (command) => {
        if (command === 'paste') {
            navigator.clipboard.readText().then((text) => {
                document.execCommand('insertText', false, text);
            });
        } else if (command === 'copy') {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                navigator.clipboard.writeText(selection.toString());
            }
        } else if (command === 'insertTable') {
            const table = `
                <table border="1" style="border-collapse: collapse; width:100%">
                    <tr><td>Ćelija 1</td><td>Ćelija 2</td></tr>
                    <tr><td>Ćelija 3</td><td>Ćelija 4</td></tr>
                </table>`;
            document.execCommand('insertHTML', false, table);
        } else {
            document.execCommand(command, false, null);
        }
    };

    const handleSave = async () => {
        const biography = richTextRef.current ? richTextRef.current.innerHTML : '';

       
        const parts = fullName.trim().split(' ');
        const first_name = parts[0] || '';
        const last_name = parts.slice(1).join(' ') || '';

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('biography', biography);

        try {
            const response = await fetch(`http://0.0.0.0:80/api/authors/${authorId}?_method=PUT`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: formData
            });

            const data = await response.json();
            console.log('API response:', data);

            if (data.status === 'success') {
                alert('Autor uspjesno azuriran!');
                navigate('/all_authors'); 
            } else {
                alert('Greška pri izmjeni autora.');
            }
        } catch (error) {
            console.error('Greska:', error);
            alert('Snadji se pookie :3');
        }
    };

    const handleCancel = () => {
        setFullName('');
        if (richTextRef.current) {
            richTextRef.current.innerHTML = '';
        }
    };

    return(
        <>
            <Header />
            <Sidebar />
            <div className="edit_author_canvas">
                <div className="edit_author_header">
                    <div className="edit_author_title">
                        <h1>Izmjeni podatke</h1>
                    </div>
                    <div className="edit_author_path">
                        <p>Evidencija autora / Izmjeni podatke</p>
                    </div>
                </div>
                <div className="edit_author_header_divider">
                    <hr />
                </div>
                <div className="edit_author_info">
                    <div className="edit_author_name_section">
                        <div className="edit_author_name_placeholder">
                            <p>Ime i prezime <span className="color_me_red">*</span></p>
                        </div>
                        <div className="edit_author_name_input">
                            <input 
                                type='text' 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="edit_author_bio_section">
                        <div className="edit_author_bio_placeholer">
                            <p>Opis</p>
                        </div>
                        <div className="edit_author_bio_input">
                            
                            <div style={{ marginBottom: "8px" }}>
                                <button type="button" onClick={() => handleCommand('bold')}><b>B</b></button>
                                <button type="button" onClick={() => handleCommand('italic')}><i>I</i></button>
                                <button type="button" onClick={() => handleCommand('underline')}><u>U</u></button>
                                <button type="button" onClick={() => handleCommand('copy')}>Copy</button>
                                <button type="button" onClick={() => handleCommand('paste')}>Paste</button>
                                <button type="button" onClick={() => handleCommand('insertTable')}>Tabela</button>
                            </div>

                            
                            <div 
                                ref={richTextRef}
                                className="edit_author_richtext" 
                                contentEditable="true" 
                                suppressContentEditableWarning={true}
                            >
                                Ovdje unesi opis...
                            </div>
                        </div>
                    </div>
                </div>

                <div className="edit_author_buttons">
                    <button 
                        type="button" 
                        className="edit_author_cancel_btn"
                        onClick={handleCancel}
                    >
                        Ponisti X
                    </button>
                    <button 
                        type="button"  
                        className="edit_author_confirm_btn"
                        onClick={handleSave}
                    >
                        Sacuvaj ✓
                    </button>
                </div>
            </div>
        </>
        
    );

};

export default EditAuthor;
