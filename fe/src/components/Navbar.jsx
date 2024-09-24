import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
const Navbar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
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
    );
}

export default Navbar;