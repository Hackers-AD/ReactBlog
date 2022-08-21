import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';

const Navbar = () => {
    const posts = useSelector(s => s.post);
    const auth = useSelector(s => s.auth);
    
    useEffect(() => {
       
    })

    return ( 
        <nav className='navbar navbar-expand navbar-dark bg-dark sticky-top shadow-md py-3'>
            <div className='container'>
                <div className='d-flex align-items-center'>
                    <Link to='/' className='navbar-brand'>
                        <div className='d-flex align-items-center'>
                            <img src="favicon.ico" alt="" className='w-25' />
                            <div className='ms-2'>ReactBlog</div>
                        </div>
                    </Link>
                    <div className='badge bg-light rounded-circle'>
                        <span className='text-dark'>{posts.length}</span>
                    </div>
                </div>
                <div>
                    {!auth.is_authenticated ?
                        <ul className='navbar-nav me-auto'>
                            <li className='nav-item mx-2'>
                                <Link to='/login' className='link text-light'>
                                    <span className='fa fa-sign-in'></span> Login
                                </Link>
                            </li>
                            <li className='nav-item mx-2'>
                                <Link to='/register' className='link text-light'>
                                    <span className='fa fa-user'></span> Register
                                </Link>
                            </li>
                        </ul>
                    :
                        <ul className='navbar-nav me-auto'>
                            <li className='nav-item mx-2'>
                                <Link to='/profile' className='link text-light'>
                                    <span className='fa fa-user'></span> Profile
                                </Link>
                            </li>
                            <li className='nav-item mx-2'>
                                <Link to='/logout' className='link text-light'>
                                    <span className='fa fa-sign-out'></span> Logout
                                </Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;