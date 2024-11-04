import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';



const UserOrders = () => {
    const userOrders = useSelector(state => state.userOrders.items);
    const userProducts = useSelector(state => state.userProducts.items);

    const findPrice = (price, quantity) => {
        return price * quantity
    }

    const formatOrder = (date) => {
        const d = new Date(date)
        const date_dd_mm_yyyy = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
        return date_dd_mm_yyyy
    }

    const getProductTitle = (productID) => {
        const product = userProducts.find(product => product.ProductID == productID)
        return product?.["Product Title"]
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
                                        <td>{findPrice(product["Price When Bought"], product.Quantity)}</td>
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