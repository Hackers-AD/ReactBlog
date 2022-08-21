import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const PostCategory = () => {
    const posts = useSelector(s => s.post);

    return (
        <div className='my-3'>
            <div className='my-3'>
                <div className='h5 text-dark font-algerian'>Recent Posts</div>
                <ul>
                    {posts.reverse().map(post => {
                        return(
                            <li key={post.id} className=''>
                                <Link to={`/post/${post.id}`} className='link font-italic'>
                                    {post.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='my-3'>
                <div className='h5 text-dark font-algerian'>Popular Posts</div>
                <ul>
                    {posts.reverse().map(post => {
                        return(
                            <li key={post.id} className=''>
                                <Link to={`/post/${post.id}`} className='link font-italic'>
                                    {post.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}
 
export default PostCategory;