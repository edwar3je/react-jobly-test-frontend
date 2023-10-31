import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div>
            <p>It looks we couldn't find what you were looking for.</p>
            <Link exact="true" to="/">Return Home</Link>
        </div>
    );
};

export default NotFound;