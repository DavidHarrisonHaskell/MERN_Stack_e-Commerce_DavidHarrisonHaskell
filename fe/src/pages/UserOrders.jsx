import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/index';


const UserOrders = () => {
    const userOrders = useSelector(state => state.userOrders.items);

    const logOut = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    }
    return (
        <>
            <Navbar /><br />
            <div>
                <h1>User Orders</h1>
                {userOrders.length === 0 && <h1>No orders found</h1>}
                {userOrders.length > 0 && userOrders.map(order => (
                    <div key={order._id}>
                        <h1>Order ID: {order._id}</h1>
                        <p>User First Name: {order["Order Date"]}</p>
                        <p>Products:</p><br />
                        {order.Orders.map(product => (
                            <div key={product.ProductID}>
                                <p>Product ID: {product.ProductID}</p>
                                <p>Product Title: {product["Product Title"]}</p>
                                <p>Quantity: {product.Quantity}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserOrders