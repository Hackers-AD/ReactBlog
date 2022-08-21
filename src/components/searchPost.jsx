import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPost = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState(() => '');

    const handleChange = (e) => {
        let searchWord = e.target.value;
        if(/^\s/.test(searchWord)){
            searchWord = searchWord.trim();
        }
        setSearch(searchWord)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${search}`);
        e.target.reset();
    }

    return (
        <div>
            <form method='post' onSubmit={handleSubmit}>
                <div className='d-flex'>
                    <input type="text" className="form-control" placeholder='Search posts' value={search}
                        onChange={(e) => handleChange(e)} required/>
                    <button className='btn btn-dark'><span className='fa fa-search'></span></button>
                </div>
            </form>
        </div>
    );
}
 
export default SearchPost;