import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {

    const successfulLogin = localStorage.getItem('successfulLogin');
    const token = sessionStorage.getItem('token');
    const admin = sessionStorage.getItem('admin');

    if (successfulLogin && token && admin) {
        return children;
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectedRouteAdmin;