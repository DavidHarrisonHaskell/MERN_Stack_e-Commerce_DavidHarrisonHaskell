import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {

    const successfulLogin = sessionStorage.getItem('successfulLogin');
    const token = sessionStorage.getItem('token');
    const admin = sessionStorage.getItem('admin');

    if (successfulLogin && token && admin === 'true') {
        return children;
    } else if (successfulLogin && token && admin === 'false') {
        console.log("User logged in but not an admin")
        return <Navigate to='/user' />
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectedRouteAdmin;