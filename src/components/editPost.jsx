import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { edit_post } from '../store/actions';

const EditPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const posts = useSelector(s => s.post);
    const post = posts.filter(p => p.id == postId)[0]
    const auth = useSelector(s => s.auth);

    const [title, setTitle] = useState(() => post.title);
    const [error, setError] = useState(() => [])

    const handleSubmit = (e) => {
        setError(() => [])
        e.preventDefault();
        if(!auth.is_authenticated){
            setError((err) => [...err, {
                id: 1, 
                name: 
                <div>
                    You must login to create a post. <Link to='/login' className='link'> Click here to login</Link>
                </div>
            }])
        }else{
            dispatch(edit_post({
                id: postId,
                title: title,
            }));
            setTitle(() => '');
            e.target.reset();
            navigate('/');
        }
    } 

    return (
        <div className='card'>
            <div className="card-header h5 bg-light text-dark">Create Post</div>
            <div className='card-body'>
                <form method='post' encType='multipart/form-data' onSubmit={handleSubmit} onClick={() => setError([])}>
                    {error && 
                        <div>
                            <ul>
                                {error.map(err => {
                                    return (<li key={err.id}>{err.name}</li>)
                                })}
                            </ul>
                        </div>
                    }
                    <div className='d-flex align-items-center my-1'>
                        <div className='me-2 fw-bold'>Caption: </div>
                        <div className='w-100'>
                            <input type="text" className="form-control" placeholder='Post caption' value={title} 
                                onChange={(e) => setTitle(() => e.target.value)} required/>
                        </div>
                    </div>
                    <div className='row justify-content-start mt-2'>
                        <div className='col-md-4'>
                            <div className='d-grid gap-2'>
                                <button className='btn btn-dark'>Edit Post</button>
                            </div>
                        </div>
                    </div>                    
                </form>
            </div>
        </div>
    );
}
 
export default EditPost;