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
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder={`Enter ${type} name`} value={formData.name} onChange={handleChange}></input>
            <button>Submit</button>
        </form>
    );
}

export default SearchForm;