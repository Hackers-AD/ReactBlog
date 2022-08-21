import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import SearchPost from './searchPost';

const Post = () => {
    const postId = useParams('id');
    const posts = useSelector(s => s.post);
    const post = posts.filter(p => p.id == postId.id)[0]

    return (
        <div className='my-3'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
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
                            { post.image_url && <img src={post.image_url} alt="post_image" className="w-100 post-image" /> }
                        </div>
                    </div>
                </div>
                <div className='col-md-8 my-3'>
                    <div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Post;