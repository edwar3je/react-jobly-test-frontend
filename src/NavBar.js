import React from 'react';
import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';

/** This component functions as the navbar across all major components within the React app. The layout of the navbar will differ
 *  depending on the current 'user' prop value. The navbar also contains a 'signOut' prop which contains a function that signs the
 *  current user out of their account and redirects them to the home page. 
 */

const NavBar = ({ user, signOut }) => {

    const navigate = useNavigate();

    const signOutFull = (e) => {
        e.preventDefault();
        signOut();
        return navigate('/');
    }

    /** If the 'user' prop value is empty, the navbar will only display two links: a sign-up form (allows users to register a new account), 
     *  and a log-in form (allows users to log into an existing account). If the 'user' prop isn't empty, the user can access the following
     *  links: Companies (information on companies), Jobs (information on available jobs), Profile (allows user to view/edit profile info)
     *  and a Sign Out button (signs the user out of their account and redirects them to the home page).
    */
    
    if(!user){
        return (
            <div>
                <nav className="nav-container">
                    <div className="nav-left-container">
                        <NavLink className="nav-home" exact="true" to="/">Jobly</NavLink>
                    </div>
                    <div className="nav-right-container">
                        <NavLink className="nav-sign-up" exact="true" to="/sign-up">Signup</NavLink>
                        <NavLink className="nav-login" exact="true" to="/login">Login</NavLink>
                    </div>
                </nav>
            </div>
        );
    } else {
        return (
            <div>
                <nav className="nav-container">
                    <div className="nav-left-container">
                        <NavLink className="nav-home" exact="true" to="/">Jobly</NavLink>
                    </div>
                    <div className="nav-right-container">
                        <NavLink className="nav-companies" exact="true" to="/companies">Companies</NavLink>
                        <NavLink className="nav-jobs" exact="true" to="/jobs">Jobs</NavLink>
                        <NavLink className="nav-profile" exact="true" to="/profile">Profile</NavLink>
                        <button className="nav-sign-out" onClick={signOutFull}>Sign Out {user}</button>
                    </div>
                </nav>
            </div>
        );
    };
};

export default NavBar;