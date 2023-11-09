import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ type, lookup }) => {
    
    const initialState = {
        name: ""
    };
    
    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { name } = formData
        lookup(name);
        setFormData(initialState);
    };

    return (
        <form className="search-form-container" onSubmit={handleSubmit}>
            <input className="search-form-input" type="text" name="name" placeholder={`Enter ${type} name`} value={formData.name} onChange={handleChange}></input>
            <button className="search-form-submit">Submit</button>
        </form>
    );
}

export default SearchForm;