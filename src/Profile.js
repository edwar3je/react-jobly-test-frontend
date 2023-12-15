import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

/** This component will display a form that allows users to adjust their profile information (sans their username). */

const Profile = ({ user, updateUser }) => {

    const [formData, setFormData] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    /** Upon any change made to the 'user' prop (stand in for 'currentUser' state), the form data will be set to information from the 'user' prop. 
     *  Since the 'user' prop will only change based off changes made to the input fields, this allows users to update their profile by only
     *  adjusting fields they would like to change.
     */

    useEffect(() => {
        console.log('You reached the effect process')
        if(user){
            setFormData({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
            setIsLoading(false);
        }
    }, [user]);

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const submitObject = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        }
        await updateUser(submitObject);
        navigate('/');
    }

    // Change to localStorage.getItem('currentUserInfo') or make it an "OR" conditional

    if(!localStorage.getItem('currentUser') || !localStorage.getItem('currentUserInfo')){
        return navigate('/');
    };

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        );
    };

    return (
        <div className="profile-general-container">
            <h1 className="notice">Update Profile Information</h1>
            <form className="profile-form-container" onSubmit={handleSubmit}>
                <div className="profile-username">
                    <label className="profile-label" htmlFor="username">Username</label>
                    <input type="text" className="profile" id="username" name="username" value={formData.username} readOnly></input>
                </div>
                <div className="profile-first-name">
                    <label className="profile-label" htmlFor="firstName">First Name</label>
                    <input type="text" className="profile" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                </div>
                <div className="profile-last-name">
                    <label className="profile-label" htmlFor="lastName">Last Name</label>
                    <input type="text" className="profile" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></input>
                </div>
                <div className="profile-email">
                    <label className="profile-label" htmlFor="email">Email Address</label>
                    <input type="text" className="profile" id="email" name="email" value={formData.email} onChange={handleChange}></input>
                </div>
                <button className="profile-submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Profile;