import Navbar from "../components/Navbar"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../slices/userProductsSlice';
import { fetchUserOrders } from '../slices/userOrdersSlice';
import { fetchUserAccount } from '../slices/userAccountSlice';
import { fetchProducts } from '../slices/productsSlice';
import { logout } from '../actions/index';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './UserProducts.css';



const UserProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // load all redux states
    const userProducts = useSelector(state => state.userProducts.items);
    const userProductsStatus = useSelector(state => state.userProducts.status);
    const error = useSelector(state => state.userProducts.error);

    const userOrdersStatus = useSelector(state => state.userOrders.status);
    const userOrdersError = useSelector(state => state.userOrders.error);

    const userAccountStatus = useSelector(state => state.userAccount.status);
    const userAccountError = useSelector(state => state.userAccount.error);

    const productsStatus = useSelector(state => state.products.status);
    const productsError = useSelector(state => state.products.error);

    useEffect(() => {
        // TODO: get user Id from sessionStorage and pass it to fetchUserProducts
        const id = sessionStorage.getItem('id')?.toString();
        console.log("sessionstorage id: ", id)

        if (userProductsStatus === 'idle') {
            try {
                dispatch(fetchUserProducts({ id }));
            } catch (error) { console.log(error) }
        }
        if (userOrdersStatus === 'idle') {
            try {
                dispatch(fetchUserOrders({ id }));
            } catch (error) { console.log(error) }
        }
        if (userAccountStatus === 'idle') {
            try {
                dispatch(fetchUserAccount({ id }));
            } catch (error) { console.log(error) }
        }
        if (productsStatus === 'idle') {
            try {
                dispatch(fetchProducts());
                console.log("success")
            } catch (error) {
                console.log(error)
                console.log("unsuccessful")
            }
        }
    }, [userProductsStatus, userOrdersStatus, userAccountStatus, productsStatus, dispatch]);

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <>
            <Navbar /><br />
            <div className="userProductsContainer">
                <div className="productsAndCart">
                    <div className="productsContainer">
                        {userProductsStatus === 'loading' && <h1>Loading...</h1>}
                        {userProductsStatus === 'failed' && <p>{console.log(error)}</p>}
                        {userProductsStatus === 'succeeded' && userProducts.length === 0 && <h1>No products found</h1>}
                        {userOrdersStatus === 'loading' && <h1>Loading...</h1>}
                        {userOrdersStatus === 'failed' && <p>{console.log(userOrdersError)}</p>}
                        {userAccountStatus === 'loading' && <h1>Loading...</h1>}
                        {userAccountStatus === 'failed' && <p>{console.log(userAccountError)}</p>}
                        {productsStatus === 'loading' && <h1>Loading...</h1>}
                        {productsStatus === 'failed' && <p>{console.log(productsError)}</p>}
                        <div className="containerForEachProduct">
                            {userProductsStatus === 'succeeded' && userProducts.map(product => (
                                <div key={product.ProductID} className="userProducts">
                                    <div style={{ width: '40%' }} >
                                        <h1>{product["Product Title"]}</h1>
                                        <p>{product.Category}</p>
                                        <p>${product.Price}</p>
                                        <p>{product.Description}</p>
                                        <div className="quantityControl">
                                            <button>
                                                +
                                            </button>
                                            <input type="number" defaultValue={0} />
                                            <button>
                                                -
                                            </button>
                                        </div>

                                    </div>
                                    <div style={{ width: '40%' }}>
                                        <img src={product["Link to pic"]} width={200} height={200} alt="product pic" />
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <p>Bought: {product["Number of Units Sold"]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button onClick={toggleExpand}>
                        {isExpanded ? <b>←</b> : <b>→</b>}
                    </Button><br />
                    {isExpanded && (
                        <div>
                            <input
                                type="number"
                                value={1}
                            />
                            <Button>Add to Cart</Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserProducts