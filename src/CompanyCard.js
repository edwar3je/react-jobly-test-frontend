import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

/** Renders a card that contains some information on a company (name and description) and acts as a link to a
 *  page containing information on available jobs from the company.
 */

const CompanyCard = ({ handle, name, description }) => {
    
    const path = `/companies/${handle}`

    return (
        <div className="company-card-container">
            <div className="company-card-title">
                <Link className="company-card-name" to={path}>{name}</Link>
            </div>
            <div className="company-card-details">
                <p className="company-card-description">{description}</p>
            </div>
        </div>
    )
};

export default CompanyCard;