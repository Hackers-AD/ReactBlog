import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { create_user } from '../store/actions';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(s => s.user);

    const [error, setError] = useState(() => []);
    const [user, setUser] = useState(() => ({
        email: '',
        password: '',
        full_name: '',
    }));

    useEffect(() => {
        
    }, [])

    const handleSubmit = (e) => {
        setError(() => []);
        e.preventDefault();

        let filteredUser = users.filter(u => (u.email == user.email))
        
        if (filteredUser.length == 0){
            dispatch(create_user(user));
            e.target.reset();
            navigate('/');
        }else{
            setError((err) => [...err, {id: 1, name: 'Email already in-use'}]);
        }
    }

    return ( 
        <div className='py-3'>
            <div className='h3 text-center my-2'>
                <span className='text-primary'>R</span>eact<span className='text-primary'>B</span>log
            </div>
            <div className='row justify-content-center'>
                <div className='col-md-7'>
                    <div className='card py-3'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit} method='post' onClick={() => setError([])}>
                                {error && 
                                    <div>
                                        <ul>
                                            {error.map(err => {
                                                return (<li key={err.id}>{err.name}</li>)
                                            })}
                                        </ul>
                                    </div>
                                }
                                <div className='my-2'>
                                    <div className='fw-bold'>Email address:</div>
                                    <input type="email" className="form-control" placeholder='Email address' value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})} />
                                </div>
                                <div className='my-2'>
                                    <div className='fw-bold'>Password:</div>
                                    <input type="password" className="form-control" placeholder='Password' value={user.password}
                                        onChange={(e) => setUser({...user, password: e.target.value})} />
                                </div>
                                <div className='my-2'>
                                    <div className='fw-bold'>Full name:</div>
                                    <input type="text" className="form-control" placeholder='Full name' value={user.full_name}
                                        onChange={(e) => setUser({...user, full_name: e.target.value})}/>
                                </div>
                                
                                <div className='d-grid gap-2 my-2'>
                                    <input type='submit' className='btn btn-primary' value='Register User' />
                                </div>
                                <hr />
                                <Link to='/login' className='link'>
                                    <div className='d-grid gap-2 my-2'>
                                        <div className="btn btn-success">Sign In</div>
                                    </div>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Register;