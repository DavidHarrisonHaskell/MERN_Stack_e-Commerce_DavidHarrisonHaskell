import Navbar from "../components/Navbar"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../slices/userProductsSlice';
import { fetchUserOrders } from '../slices/userOrdersSlice';
import { fetchUserAccount } from '../slices/userAccountSlice';
import { addToCart, removeFromCart, setCartQuantity, initializeCart } from "../slices/userCartSlice";
import { logout } from '../actions/index';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './UserProducts.css';
import axios from "axios";


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

    const cartItems = useSelector(state => state.userCart.items);

    useEffect(() => {
        const id = sessionStorage.getItem('id')?.toString();

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
    }, [userProductsStatus, userOrdersStatus, userAccountStatus, dispatch]);


    useEffect(() => {
        if (userProductsStatus === 'succeeded' && Object.keys(cartItems).length === 0) {
            let productsObject = {}
            userProducts.forEach(product => {
                productsObject[product.ProductID] = 0
            })
            dispatch(initializeCart({ productsObject }))
        }
    }, [userProducts, dispatch]);

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const totalPrice = Object.keys(cartItems).reduce((total, productId) => {
        const product = userProducts.find(product => product.ProductID === productId);
        return total + (product.Price * cartItems[productId]);
    }, 0)

    const logOut = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    }

    const checkout = async () => {
        const id = sessionStorage.getItem('id')?.toString();
        const token = sessionStorage.getItem('token');
        let cartItemsForCheckout = Object.entries(cartItems).filter(([productId, quantity]) => quantity > 0)
        // need to iterate through each productId and find the price for each one and
        // then add the price to the object as a "Price When Bought" key
        // then add the object to the checkoutOrder object
        let checkoutOrder = cartItemsForCheckout.map(product => {
            let the_product = userProducts.find(p => p.ProductID === product[0])
            return {
                "ProductID": product[0],
                "Quantity": product[1],
                "Price When Bought": the_product.Price
            }
        })
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/${id}/orders`, checkoutOrder, {
                headers: {
                    'token': token
                }
            });

        } catch (error) {
            alert("error: ", error, "message: ", error.message)
        }
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
                        <div className="containerForEachProduct">
                            {userProductsStatus === 'succeeded' && userProducts.map(product => (
                                <div key={product.ProductID} className="userProducts">
                                    <div style={{ width: '40%' }} >
                                        <h1>{product["Product Title"]}</h1>
                                        <p>{product.Category}</p>
                                        <p>${product.Price}</p>
                                        <p>{product.Description}</p>
                                        <div className="quantityControl">
                                            <button onClick={() => dispatch(addToCart({ productId: product.ProductID }))}>
                                                +
                                            </button>
                                            <input
                                                type="number"
                                                value={cartItems[product.ProductID] || 0}
                                                readOnly
                                            />
                                            <button onClick={() => dispatch(removeFromCart({ productId: product.ProductID }))}>
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
                            <br /><h2 className="cartHeader"><b>Cart</b></h2>
                            {Object.keys(cartItems).filter(productId => cartItems[productId] > 0).map(productId => {
                                const product = userProducts.find(product => product.ProductID === productId);
                                return (
                                    <div key={productId}>
                                        <span className="productInCart">
                                            {product["Product Title"]}
                                            <label>&nbsp;-&nbsp;</label>
                                            <button onClick={() => dispatch(removeFromCart({ productId: productId }))}>-</button>&nbsp;
                                            {cartItems[productId]}&nbsp;
                                            <button onClick={() => dispatch(addToCart({ productId: productId }))}> + </button>&nbsp;
                                            <label>&nbsp;units - Total:&nbsp;${product.Price * cartItems[productId]}</label>&nbsp;
                                            <button
                                                className="deleteFromCart"
                                                onClick={() => dispatch(setCartQuantity({ productId }))}
                                            >
                                                X
                                            </button>
                                        </span>
                                    </div>
                                )
                            })}
                            <div className="TotalContainerOuter">
                                <div className="TotalContainerInner">
                                    <div>
                                        <h3>Total: ${totalPrice}</h3>
                                    </div>
                                    {totalPrice > 0 && (
                                        <div>
                                            <Button
                                                className="Order"
                                                variant="success"
                                                onClick={() => {
                                                    checkout()
                                                    logOut()
                                                }}
                                            >
                                                Order
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserProducts