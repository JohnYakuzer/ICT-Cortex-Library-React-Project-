import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import './styles/all_authors.css';

const RenderAllAuthors = () => {
    const [users, setUsers] = useState([]);               
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchUsers = () => {
        setLoading(true);
        fetch(`http://0.0.0.0:80/api/authors?per_page=${usersPerPage}&page=${currentPage}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                setUsers(data.data.data);
                setTotalPages(data.data.meta?.last_page || 1);
            }
        })
        .catch(err => console.error('Failed to load authors: ', err))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, usersPerPage]);

    const goToAuthorProfile = (userId) => {
        navigate(`/author_profile/${userId}`);
    };

    const goToAddAuthor = () => {
        navigate('/add_author');
    };

    const handleDeleteUser = (userId) => {
        fetch(`http://0.0.0.0:80/api/authors/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Author deleted successfully.') {
                setUsers(prev => prev.filter(user => user.id !== userId));
            }
        })
        .catch(err => console.error('Failed to delete author: ', err));
    };

    const toggleDropdown = (userId) => {
        setOpenDropdownId(prev => (prev === userId ? null : userId));
    };

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleUsersPerPageChange = (e) => {
        setUsersPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

   
    const filteredUsers = users.filter(user =>
        (`${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.biography && user.biography.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return (
            <>
                <Header />
                <Sidebar />
                <div className="fetching_users_content">
                    <h1>Loading authors, please wait...</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="all_users_canvas">
                <div className="users_table_holder">
                    <div className="all_users_header">
                        <div className="all_users_title">
                            <div className="all_users_subtitle">
                                <h1>Autori</h1>
                            </div>
                            <div className="all_users_divider">
                                <hr />
                            </div>
                        </div>

                        <div className="all_users_controls">
                            <div className="add_new_user">
                                <button className="add_user_button" onClick={goToAddAuthor}>
                                    + Novi autor
                                </button>
                            </div>

                            <div className="all_user_search_bar">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="currentColor" fillOpacity="0.6"/>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="search_input"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="search_icon"></span>
                            </div>
                        </div>
                    </div>
                    <div className="user_space_holder">
                        <div className="user_profiles_header_section">
                            <div className="useless_checkbox">
                                <input type="checkbox"></input>
                            </div>
                            <div className="author_profiles_header_full_name">
                                <p>Naziv autora ↓</p>
                            </div>
                            <div className="user_profiles_info">
                                <p>Opis</p>
                            </div>
                        </div>
                        {filteredUsers.map(user => (
                            <div className="user_template_profile" key={user.id}>
                                <div className="user_profile_checkbox">
                                    <input type="checkbox" />
                                </div>
                                <div className="user_profile_full_name">
                                    <div className="user_profile_pic">
                                        <img
                                            src="/assets/dashboard_images/profile_pic_dashboard.jpg"
                                            alt="Profilna slika"
                                            className="profile_pic_user"
                                        />
                                    </div>
                                    <div className="user_full_name_fetch">
                                        <p onClick={() => goToAuthorProfile(user.id)} style={{ cursor: 'pointer' }}>
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </div>
                                </div>
                                <div className="user_info_fetch">
                                    <p>{user.biography}</p>
                                </div>
                                <div
                                    className="user_option_drop_menu_icon"
                                    onClick={() => toggleDropdown(user.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z"/>
                                    </svg>

                                    {openDropdownId === user.id && (
                                        <div className="dropdown_menu">
                                            <div className="dropdown_item" onClick={() => goToAuthorProfile(user.id)}>
                                                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon_drop_down_menu">
                                                    <path d="M4 14H12V16H4V14ZM4 10H12V12H4V10ZM10 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0ZM14 18H2V2H9V7H14V18Z" fillOpacity="0.6"/>
                                                </svg>
                                                Pogledaj autora
                                            </div>
                                            <div className="dropdown_item" onClick={() => navigate('/edit_author')}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon_drop_down_menu">
                                                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z" fillOpacity="0.6"/>
                                                </svg>
                                                Izmijeni autora
                                            </div>
                                            <div className="dropdown_item" onClick={() => handleDeleteUser(user.id)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon_drop_down_menu">
                                                    <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" fillOpacity="0.6"/>
                                                </svg>
                                                Izbrisi autora
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="users_per_page_options">
                    <div className="users_per_page_placeholder">
                        <p>Rows per page:</p>
                    </div>

                    <div className="users_per_page_selection">
                        <label htmlFor="num_users_page"></label>
                        <select id="num_users_page" name="user_number_options" onChange={handleUsersPerPageChange} value={usersPerPage}>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                        </select>
                    </div>

                    <div className="show_page_of">
                        <p>{currentPage} of {totalPages}</p>
                    </div>

                    <div className="pagination_arrows">
                        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>&lt;</button>
                        <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>&gt;</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RenderAllAuthors;
