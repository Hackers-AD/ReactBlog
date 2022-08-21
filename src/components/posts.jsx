import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { delete_post } from '../store/actions';

import SearchPost from './searchPost';
import PostCategory from './postCategory';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(s => s.post);
    const auth = useSelector(s => s.auth);

    const { key } = useParams();
    
    const filteredPosts = posts.filter(p => {
        let re = new RegExp(key, "i")
        if(re.test(p.title)){
            return p;
        }
    });

    const handleDelete = (id) => {
        dispatch(delete_post(id));
    }

    return (
        <div className='my-3'>
            <div className='row'>
                <div className='col-md-8'>
                {filteredPosts.reverse().map(post => {
                    return(
                        <div key={post.id} className='my-3'>
                            <div className='card'>
                                <div className='p-2'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='h5 fw-bold'><i>{post.user.uid}</i></div>
                                        <div className='small fw-bold text-truncate'>{post.created_date} . {post.created_time}</div>
                                    </div>
                                    <div className='mt-1'>
                                        <Link to={`/post/${post.id}`} className='link'>
                                            <div className=''>{post.title}</div>
                                        </Link>
                                    </div> 
                                </div>
                                { post.image_url && <img src={post.image_url} alt="post_image" className="w-100 post-image" />}
                                {post.user.uid === auth.user.uid ? 
                                    <div className='d-flex justify-content-between align-items-center p-2'>
                                        <Link to={`/post/edit/${post.id}`}>
                                            <div className='d-grip'>
                                                <button className="btn btn-dark">Edit</button>
                                            </div>
                                        </Link>
                                        <div className='d-grip'>
                                            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                :null}
                            </div>
                        </div>
                    );
                })}
                {filteredPosts.length === 0 ? 
                    <div className='badge bg-danger my-3'>No any post yet. Create a post to view here!</div> 
                : null}
                </div>
                
                <div className='col-md-4 my-3'>
                    <div>
                        <SearchPost />
                        {filteredPosts.length > 0 ? 
                            <PostCategory />
                        : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Posts;