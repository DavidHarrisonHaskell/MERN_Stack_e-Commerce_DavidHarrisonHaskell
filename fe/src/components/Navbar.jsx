import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
    return (
        <>
            <div className='adminHeader'><h1>Hi, Admin</h1></div>

            <div className="navbar">
                <div className='navbar-links'>
                    <Link to={"/admin/categories"}>Categories</Link>
                    <Link to={"/admin/products"}>Products</Link>
                    <Link to={"/admin/customers"}>Customers</Link>
                    <Link to={"/admin/statistics"}>Statistics</Link>
                </div>
            </div>
        </>
    );
}

export default Navbar;