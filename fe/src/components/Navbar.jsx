import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { logout } from '../actions/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const Navbar = () => {
    const admin = sessionStorage.getItem('admin');
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);



    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    }

    return (
        <>
            {admin === 'true' ? (
                <>
                    <div className='adminHeader'><h1>Hi, Admin</h1></div>

                    <div className="navbar">
                        <div className='navbar-links'>

                            <Link
                                to={"/admin"}
                                className={activeLink === '/admin' ? 'active' : ''}
                                onClick={() => setActiveLink('/admin')}
                            >
                                Categories
                            </Link>

                            <Link
                                to={"/admin/products"}
                                className={activeLink === '/admin/products' ? 'active' : ''}
                                onClick={() => setActiveLink('/admin/products')}
                            >
                                Products
                            </Link>

                            <Link
                                to={"/admin/customers"}
                                className={activeLink === '/admin/customers' ? 'active' : ''}
                                onClick={() => setActiveLink('/admin/customers')}
                            >
                                Customers
                            </Link>

                            <Link
                                to={"/admin/statistics"}
                                className={activeLink === '/admin/statistics' ? 'active' : ''}
                                onClick={() => setActiveLink('/admin/statistics')}
                            >
                                Statistics
                            </Link>

                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='userHeader'><h1>{`Hi, ${sessionStorage.getItem('firstName')}`}</h1></div>

                    <div className="navbar">
                        <div className='navbar-links'>

                            <Link
                                to={"/user"}
                                className={activeLink === '/user' ? 'active' : ''}
                                onClick={() => setActiveLink('/user')}
                            >
                                Products
                            </Link>

                            <Link
                                to={"/user/orders"}
                                className={activeLink === '/user/orders' ? 'active' : ''}
                                onClick={() => setActiveLink('/user/orders')}
                            >
                                Orders
                            </Link>

                            <Link
                                to={"/user/account"}
                                className={activeLink === '/user/account' ? 'active' : ''}
                                onClick={() => setActiveLink('/user/account')}
                            >
                                Account
                            </Link>

                            <span
                                onClick={logOut}
                                className={activeLink === '/login' ? 'active' : ''}
                                style={{ cursor: 'pointer' }}
                            >
                                Log Out
                            </span>

                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;