import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

/** This component is used to gather form data that allow users to register a new account */

const SignUpForm = ({ signUp }) => {

    /** The signUp prop contains a function that passes a function specified in the App component using data from the form. If the result of the 
     *  function is successful, a new user will be registered in the database on the backend, a new token will be generated, the 'token' state 
     *  will be set to the new token, and the 'currentUser' state will be set to the username from the form data. The component will also redirect
     *  users back to the home page upon form submission.
     */

    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState)
    
    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        signUp(formData);
        setFormData(initialState);
        navigate('/');
    }
    
    return (
        <div className="sign-up-general-container">
            <h2 className="sign-up-title">Sign Up</h2>
            <div>
                <form className="sign-up-input-container" onSubmit={handleSubmit}>
                    <div className="sign-up-username">
                        <label className="sign-up-label" htmlFor="username">Username</label>
                        <input type="text" className="sign-up" id="username" name="username" value={formData.username} onChange={handleChange}></input>
                    </div>
                    <div className="sign-up-password">
                        <label className="sign-up-label" htmlFor="password">Password</label>
                        <input type="password" className="sign-up" id="password" name="password" value={formData.password} onChange={handleChange}></input>
                    </div>
                    <div className="sign-up-first-name">
                        <label className="sign-up-label" htmlFor="firstName">First name</label>
                        <input type="text" className="sign-up" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                    </div>
                    <div className="sign-up-last-name">
                        <label className="sign-up-label" htmlFor="lastName">Last Name</label>
                        <input type="text" className="sign-up" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></input>
                    </div>
                    <div className="sign-up-email">
                        <label className="sign-up-label" htmlFor="email">Email</label>
                        <input type="text" className="sign-up" id="email" name="email" value={formData.email} onChange={handleChange}></input>
                    </div>
                    <button className="sign-up-submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;