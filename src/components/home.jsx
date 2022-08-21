import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from './createPost';
import Posts from './posts';

const Home = () => {

    useEffect(() => {
        
    }, []);

    return ( 
        <div>
            <CreatePost />
            <Posts />
        </div>
     );
}
 
export default Home;