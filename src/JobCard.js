import React from 'react';
import './JobCard.css';

/** Renders a card that contains information on a specific job that can be used for either a general job search,
 *  or to display information on jobs within a given company. The 'company' prop is null by default to allow
 *  developers to include the component on a company-specific page. The 'id' and 'user' props are needed to to 
 *  render the proper button to allow users to apply to a job (if not already applied).
  */

const JobCard = ({ id, title, salary, equity, company=null, user, apply}) => {

    /** Applies user for a job and saves information to both the backend and frontend. */

    const handleApply = async (username, jobId, jobTitle) => {
        await apply(username, jobId, jobTitle);
    };

    /** Renders either a non-clickable or clickable button depending on whether the user has applied for the job
     *  (clickable if hasn't applied, non-clickable if has applied). The function determines if the user has applied
     *  for the job by examining if the jobId can be found within the 'jobs' array found in the 'user' prop.
     */

    const applyButton = (id, user) => {
        for(let job of user.applications){
            if(job === id){
                return (
                    <button className="job-card-applied-button">Applied</button>
                )
            }
        };
        return (
            <button className="job-card-apply-button" onClick={async () => await handleApply(user.username, id, title)}>Apply</button>
        );
    };

    /** If company is null, the company is omitted from the render (otherwise, the company information is rendered). */
    
    if(!company){

        return (
            <div className="job-card-container">
                <div className="job-card-title-container">
                    <h3 className="job-card-title">{title}</h3>
                </div>
                <div className="job-card-multi-container">
                    <div className="job-card-details-container">
                        <ul className="job-card-details-list">
                            <li className="job-card-salary">Salary: {salary}</li>
                            <li className="job-card-equity">Equity: {equity}</li>
                        </ul>
                    </div>
                    <div className="job-card-button-container">
                        {applyButton(id, user)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="job-card-container">
            <div className="job-card-title-container">
                <h3 className="job-card-title">{title}</h3>
            </div>
            <div className="job-card-multi-container">
                <div className="job-card-details-container">
                    <ul className="job-card-details-list">
                        <li className="job-card-company">{company}</li>
                        <li className="job-card-salary">Salary: {salary}</li>
                        <li className="job-card-equity">Equity: {equity}</li>
                    </ul>
                </div>
                <div className="job-card-button-container">
                    {applyButton(id, user)}
                </div>
            </div>
        </div>
    );
};

export default JobCard;