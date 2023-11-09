import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/** This component functions as the home page for the Jobly React app. */

const Home = ({ user }) => {

    /** This function will generate a different set of HTML below the 'title' of the home page depending on if the 'user' prop is
     *  empty or not. If the user prop is empty, two buttons will render that redirect the user to either a sign-up form, or a log-in
     *  form. If the user prop isn't empty, the page will generate a message welcoming the user back by their first name.
     */

    const loadOnUser = () => {
        if(!user){
            return (
                <div className="home-button-container">
                    <button className="home-buttons">
                        <Link className="home-buttons-text" exact="true" to="/sign-up">Sign up</Link>
                    </button>
                    <button className="home-buttons">
                        <Link className="home-buttons-text" exact="true" to="/login">Log in</Link>
                    </button>
                </div>
            );    
        }
        return (
            <h3 className="home-welcome">Welcome Back, {user.firstName}!</h3>
        );
    };

    return (
        <div className="home-container">
            <h2 className="home-title">Jobly</h2>
            {loadOnUser()}
        </div>
    );
};

export default Home;