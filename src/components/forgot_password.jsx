import React from 'react';
import { Link } from 'react-router-dom';
import './styles/forgot_passwd.css';




const ForgotPassword = () => {
    return(
        <div className="bg_image">
            <div className="login_container">
                <div className="place_holder">
                    <div className="login_container_title">
                        <h2>Forgot password</h2>
                    </div>
                </div>
                <div className="login_container_divider">
                    <hr />
                </div>
                

                    <form className="login_form">
                        
                        <div className="login_form_email_container">
                            <div className="email_label">
                                <p>Email</p>
                            </div>
                            <input type="email" id="email" placeholder="example@example.net" required className="login_form_email"></input>
                        </div>
                        
                        <div className="login_form_password_container">
                            <input type="password" id="password" placeholder="Enter last remembered password" required className="login_form_password"></input>
                        </div>
                    
                        
                            <button type="submit" className="login_form_button">Request password reset</button>
                        
                        
                    </form>

                    <div className="login_container_forgotpasswd">
                        <Link to="/login">Back to login?</Link>
                    </div>

                    <div className="login_container_copyright">
                        <p>
                            ©2021 ICT Cortex. All rights reserved.
                        </p>
                    </div>
            </div>
        </div>
    
        
    );
};

export default ForgotPassword;