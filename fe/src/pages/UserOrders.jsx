import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/index';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useEffect } from 'react';



const UserOrders = () => {
    const userOrders = useSelector(state => state.userOrders.items);
    const products = useSelector(state => state.products.items);

    console.log("UserOrders: userOrders", userOrders)
    console.log("UserOrders: products", products)


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const findPrice = (productID, quantity) => {
        const product = products.find(product => product._id === productID)
        const price = product.Price
        return price * quantity
    }

    const formatOrder = (date) => {
        const d = new Date(date)
        const date_dd_mm_yyyy = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
        return date_dd_mm_yyyy
    }

    const getProductTitle = (productID) => {
        const product = products.find(product => product._id == productID)
        console.log("products", products)
        console.log("ProductID", productID, typeof(productID), "product", product)
        return product?.Title
    }
    return (
        <>
            <Navbar /><br />
            <div>
                <h1>User Orders</h1>
                {userOrders.length === 0 && <h1>No orders found</h1>}
                {userOrders.length > 0 && (
                    // make a table 
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userOrders.map(order => (
                                order.Orders.map(product => (
                                    <tr key={product._id}>
                                        <td>{getProductTitle(product.ProductID)}</td>
                                        <td>{product.Quantity}</td>
                                        {/*add total cost by adding the price of all products ordered*/}
                                        <td>{findPrice(product.ProductID, product.Quantity)}</td>
                                        <td>{formatOrder(order["Order Date"])}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </Table>
                )}


            </div>
        </>
    )
}

export default UserOrders