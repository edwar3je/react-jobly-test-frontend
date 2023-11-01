import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Profile from './Profile';
import NotFound from './NotFound';
import JoblyApi from './api';
import './App.css';

function App() {

  const initialState = "";

  /** The component will be responsible for handling three states: 'currentUser', 'currentUserInfo' and 'token'. 'currentUser' holds the user's username, 'currentUserInfo' holds 
   *  the current user's account information and 'token' holds information on the JWT token generated for the user.
   */

  const [currentUser, setCurrentUser] = useState(initialState);
  const [currentUserInfo, setCurrentUserInfo] = useState(initialState);
  const [token, setToken] = useState(initialState);

  /** This function is used when the sign-up/register form is submitted. Upon submission, the 'signupUser' static method from the JoblyApi class is called and uses the form
   *  data to generate a new token. Afterwards, the 'token' state is then set to the result of the static method, and the 'currentUser' state is set to the username within the 
   *  form data submitted. The username must be initially placed within the 'currentUser' state to allow useEffect to call upon a static method that requires the username as an 
   *  endpoint to access further information on the user from the backend. As a bonus, the token and username are stored in localStorage.
   */

  const signUp = async (data) => {
    let newToken = await JoblyApi.signupUser(data);
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setCurrentUser(data.username);
    localStorage.setItem('currentUser', data.username);
  };

  /** This function is used when the login form is submitted. Upon submission, the 'loginUser' static method from the JoblyApi class is called and uses the form data to generate a
   *  new token. Afterwards, the 'token' state is then set to the result of the static method, and the 'currentUser' state is set to the username within the form data submitted. 
   *  The username must be initially placed within the 'currentUser' state to allow useEffect to call upon a static method that requires the username as an endpoint to access
   *  further information on the user from the backend. As a bonus, the token and username are stored in localStorage.
   */

  const logIn = async (data) => {
    let newToken = await JoblyApi.loginUser(data);
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setCurrentUser(data.username);
    localStorage.setItem('currentUser', data.username);
  };

  /** This function is used when the user clicks on a log-out button featured in the navbar. Upon click, the 'token', 'currentUser' and 'currentUserInfo' states are set back to their initial
   *  values, and the user is redirected to the home page. As a bonus, information pertaining to 'token', 'currentUser' and 'currentUserInfo' are removed from localStorage.
   */

  const signOut = () => {
    setToken(initialState);
    setCurrentUserInfo(initialState);
    setCurrentUser(initialState);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserInfo');
    localStorage.removeItem('token');
    JoblyApi.signOut();
  };

  /** A function that adjusts the state of 'currentUser', 'currentUserInfo' and 'token' if 'currentUser' has a value in local storage, but not a value in the 'currentUser' state. 
   *  This ensures the user stays logged in even if they refresh the page.
  */

  const isAlreadyLoggedIn = () => {
    if(localStorage.getItem('currentUser') && !currentUser){
      const loggedInUser = localStorage.getItem('currentUser');
      const loggedInToken = localStorage.getItem('token');
      setCurrentUser(loggedInUser);
      setToken(loggedInToken);
      JoblyApi.updateToken(loggedInToken);
      // Obtain information on currentUser and place in currentUserInfo (as object) and localStorage (as JSON string)
      const userInfo = JoblyApi.getUserInfo(loggedInUser);
      setCurrentUserInfo(userInfo.user);
      localStorage.setItem('currentUserInfo', JSON.stringify(userInfo.user));
    }
  };

  /** A function that updates a user's profile information on the backend (via JoblyApi static method 'updateUserInfo') and frontend (via 'currentUser' state and localStorage). */

  const updateUser = async (data) => {
    await JoblyApi.updateUserInfo(data, currentUser);
    const updatedUser = await JoblyApi.getUserInfo(currentUser);
    // Implement
    setCurrentUserInfo(updatedUser.user);
    localStorage.setItem('currentUserInfo', JSON.stringify(updatedUser.user));
  };

  /** A function that allows a user to apply for a job (on the backend) and updates the state of 'currentUser' to reflect change to 'jobs' key. */

  const updateJob = async (username, jobId) => {
    await JoblyApi.applyForJob(username, jobId);
    // Use currentUserInfo instead of currentUser
    await JoblyApi.getUserInfo(currentUser);
    const updatedUser = await JoblyApi.getUserInfo(currentUser);
    setCurrentUserInfo(updatedUser.user);
    localStorage.setItem('currentUserInfo', JSON.stringify(updatedUser.user));
  };

  /** If a change has been made to the 'token' state, and token is truthy, the 'getUserInfo' static method from the JoblyApi class is called and uses the username within 'currentUser'
   *  to access all the available information on the user from the back-end. Afterwards, the 'currentUserInfo' state is set to a JSON string using the object returned by the static method. 
   *  To ensure the user stays logged in, the information from the static method is also placed in localStorage.
   */

  useEffect(() => {
    if(token){
      // This should update currentUserInfo, not currentUser
      const fetchUser = async () => {
         let userData = await JoblyApi.getUserInfo(currentUser);
         setCurrentUserInfo(userData.user);
         localStorage.setItem('currentUserInfo', JSON.stringify(userData.user));
      }
      fetchUser().catch(console.error);
    }
  }, [token]);

  isAlreadyLoggedIn();

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar user={currentUser} signOut={signOut} />
        <main>
          <Routes>
            <Route exact="true" path="/" element={<Home user={currentUserInfo} />} />
            <Route exact="true" path="/sign-up" element={<SignUpForm signUp={signUp} />} />
            <Route exact="true" path="/login" element={<LoginForm logIn={logIn} />} />
            <Route exact="true" path="/companies" element={<Companies />} />
            <Route path="/companies/:handle" element={<Company user={currentUserInfo} apply={updateJob} />} />
            <Route exact="true" path="/jobs" element={<Jobs user={currentUserInfo} apply={updateJob} />} />
            <Route exact="true" path="/profile" element={<Profile user={currentUserInfo} updateUser={updateUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;