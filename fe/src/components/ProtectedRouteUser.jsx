import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteUser = ({ children }) => {

    const successfulLogin = sessionStorage.getItem('successfulLogin');
    const token = sessionStorage.getItem('token');
    const admin = sessionStorage.getItem('admin');

    if (successfulLogin && token && admin === 'false') {
        return children;
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectedRouteUser;