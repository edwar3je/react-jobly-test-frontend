import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import JoblyApi from './api';
import JobCard from './JobCard';
import './Company.css';

/** Renders a list of all available jobs from the company. */

const Company = ({ user, apply }) => {
   
    const initialState = [];
    
    const [companyJobs, setCompanyJobs] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);
    
    const { handle } = useParams();

    const navigate = useNavigate();

    /** Upon first render of the component, the async function 'getJobsByCompany' will be used to obtain information on all jobs in the 
     *  database for the given company handle. Afterwards, the "companyJobs" state will be set to reflect the data from the static method, 
     *  and 'isLoading' will be set to 'false' to render the information.
     */

    useEffect(() => {
        const fetchCompanyJobs = async () => {
            const allCompanyJobs = await getJobsByCompany();
            setCompanyJobs(allCompanyJobs);
            setIsLoading(false);
        }
        fetchCompanyJobs().catch(console.error);
    }, []);

    /** A function passed in useEffect that uses the static method 'getCompany(handle)' from the JoblyApi class. The function returns an
     *  array of all available jobs from the company specified by 'handle'. 
     */

    const getJobsByCompany = async () => {
        const res = await JoblyApi.getCompany(handle);
        console.log(res.jobs);
        return res.jobs;
    };

    /** A function that is used to create the loaded component based on the current state of 'companyJobs'. If 'companyJobs' is empty
     *  (length === 0), a special message will appear indicating that the company either doesn't exist, or no jobs are available from
     *  the company. If the 'companyJobs' state isn't empty, a JobCard component will be rendered for each job.
     */

    const loadJobsByCompany = (array) => {
        if(array.length !== 0){
            return (
                <Fragment>
                    {array.map(({ id, title, salary, equity }) => {
                        return <JobCard id={id} title={title} salary={salary} equity={equity} user={user} apply={apply} key={uuidv4()}/>
                    })}
                </Fragment>
            )
        } else {
            return (
                <p>It looks like the company either doesn't exist or currently doesn't have any jobs available.</p>
            )
        }
    };

    /** If the user isn't logged in, the user will be redirected back to the home page. */

    // Change to localStorage.getItem('currentUserInfo') or make it an "OR" conditional

    if(!localStorage.getItem('currentUser') || !localStorage.getItem('currentUserInfo')){
        return navigate('/');
    }

    if(isLoading){
        return(
            <div>
                Loading...
            </div>
        );
    }

    console.log(companyJobs);
   
    return (
        <div className="company-job-cards-container">
            {loadJobsByCompany(companyJobs)}
        </div>
    );
};

export default Company;