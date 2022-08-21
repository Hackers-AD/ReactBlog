import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout_user } from '../store/actions';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(logout_user());
        navigate('/');

    }, [])

    return (null);
}
 
export default Logout;