import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login_user } from '../store/actions';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(s => s.user);

    const [error, setError] = useState(() => []);
    const [user, setUser] = useState(() => ({
        email: '',
        password: '',
    }));

    useEffect(() => {
        
    }, [])

    const handleSubmit = (e) => {
        setError(() => []);
        e.preventDefault();
        let filteredUser = users.filter(u => (u.email == user.email && u.providerId == user.password))
        if (filteredUser.length != 0){
            dispatch(login_user(user));
            e.target.reset();
            navigate('/');
        }else{
            setError((err) => [...err, {id: 1, name: 'Credential doesn\'t match the database records'}]);
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
                            <form method='post' onSubmit={handleSubmit} onClick={() => setError([])} >
                                {error && 
                                    <div>
                                        <ul>
                                            {error.map(err => {
                                                return (<li key={err.id}>{err.name}</li>)
                                            })}
                                        </ul>
                                    </div>
                                }
                                <input type="email" className="form-control my-2" placeholder='Email address' value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}/>
                                <input type="password" className="form-control my-2" placeholder='Password' value={user.password}
                                        onChange={(e) => setUser({...user, password: e.target.value})}/>
                                <div className='d-grid gap-2 my-2'>
                                    <input type='submit' className='btn btn-primary' value='Login' />
                                </div>
                                <div className='text-center'>
                                    <Link to='/forget_password'>Forget Password?</Link>
                                </div>
                                <hr />
                                <Link to='/register' className='link'>
                                    <div className='d-grid gap-2 my-2'>
                                        <div className="btn btn-success">Register</div>
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
 
export default Login;