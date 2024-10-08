import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import './AdminProducts.css';
import { logout } from "../actions/index.jsx";
import DynamicTable from "../components/DynamicTable.jsx";
import { updateProduct } from "../slices/productsSlice.jsx";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector(state => state.orders.items);
    const products = useSelector(state => state.products.items);
    const categories = useSelector(state => state.categories.items);

    const [selectedCategories, setSelectedCategories] = useState({});
    const [titles, setTitles] = useState({});
    const [descriptions, setDescriptions] = useState({});
    const [links, setLinks] = useState({});
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const initialSelectedCategories = {};
        const initialTitles = {};
        const initialDescriptions = {};
        const initialLinks = {};
        const initialPrices = {};

        products.forEach(product => {
            initialSelectedCategories[product._id] = product.CategoryID || '';
            initialTitles[product._id] = product.Title || '';
            initialDescriptions[product._id] = product.Description || '';
            initialLinks[product._id] = product["Link to pic"] || '';
            initialPrices[product._id] = product.Price || '';
        });
            setTitles(initialTitles);
            setDescriptions(initialDescriptions);
            setLinks(initialLinks);
            setPrices(initialPrices);
            setSelectedCategories(initialSelectedCategories);
            console.log("titles", titles, "descriptions", descriptions, "links", links, "prices", prices);
        }, [products]);

    
    const handleCategoryChange = (productId, newCategoryId) => {
        setSelectedCategories({
            ...selectedCategories,
            [productId]: newCategoryId
        });
    }

    const handleInputChange = (productId, key, value) => { // function to handle input change
        switch (key) {
            case "Title":
                setTitles({
                    ...titles,
                    [productId]: value
                });
                break;
            case "Description":
                setDescriptions({
                    ...descriptions,
                    [productId]: value
                });
                break;
            case "Link":
                setLinks({
                    ...links,
                    [productId]: value
                });
                break;
            case "Price":
                setPrices({
                    ...prices,
                    [productId]: value
                });
                break;
            default:
                break;
        }
    }



    const handleSave = (productID) => {
        // console.log("selectedCategories", selectedCategories);
        // console.log("productID", productID);
        // console.log("selectedCategory", categories.find(category => category._id === selectedCategories[productID]).Category);
        // console.log("SelectedCategoryID", selectedCategories[productID]);
        const product = products.find(product => product._id === productID);
        console.log("product link to pic", links[productID]);
        const updatedProduct = {
            ...product,
            Title: titles[productID] || '',
            Description: descriptions[productID] || '',
            "Link to pic": links[productID] ? links[productID] : '',
            Price: prices[productID] || 0,
            CategoryID: selectedCategories[productID] || '',
            Category: categories.find(category => category._id === selectedCategories[productID])?.Category
        }
        console.log("updatedProduct", updatedProduct);
        dispatch(updateProduct(updatedProduct));
    }


    const getProductsInformation = () => {
        const productsInformation = products.map(product => {
            let productInformation = {
                "Product ID": product._id,
                "Title": product.Title,
                "Category": product.Category,
                "CategoryID": product.CategoryID,
                "Description": product.Description,
                "Price": product.Price,
                "Link to pic": product["Link to pic"],
                "Bought By": []
            }
            let productOrders = orders.filter(order =>
                order.Orders.some(orderProduct => orderProduct.ProductID == product._id)
            );
            productOrders = productOrders.map(order => {
                let the_product_bought = order.Orders.find(orderProduct => orderProduct.ProductID == product._id)
                return {
                    "User ID": order.UserID,
                    "User First Name": order["User First Name"],
                    "ProductID": the_product_bought.ProductID,
                    "Product Title": the_product_bought["Product Title"],
                    "Quantity": the_product_bought.Quantity,
                    "Order Date": order["Order Date"]
                }
            })
            productInformation["Bought By"] = productOrders;
            return productInformation;
        })
        return productsInformation;
    }

    const logOut = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    }


    const getProductInformationForTable = (productInformation) => {
        let boughtBy = productInformation["Bought By"];
        const data = boughtBy.map(product => {
            // console.log("product", product);
            // console.log("boughtBy", boughtBy);
            // console.log("User First Name", product["User First Name"], "Quantity", product["Quantity"], "Order Date", product["Order Date"]);
            return {
                "User First Name": product["User First Name"],
                "Quantity": product["Quantity"],
                "Order Date": product["Order Date"]
            }
        })
        return data;
    }

    return (
        <>
            <Navbar /><br />
            <div className="adminProductsComponent">
                <h1 className='headerProductsAdmin'><b>Products</b></h1>
                {getProductsInformation().map((productInformation, index) => (
                    <div className="productInformationContainer" key={index}>
                        <div className="leftSideContainerProductAdmin">
                            <span><b>Title: </b>
                                <input
                                    value={titles[productInformation["Product ID"]] || ''}
                                    onChange={(e) => handleInputChange(productInformation["Product ID"], "Title", e.target.value)}
                                />
                            </span><br /><br />
                            <span><b>Category: </b></span><br />
                            <select
                                className="wideSelect"
                                value={selectedCategories[productInformation["Product ID"]] || ''}
                                onChange={(e) => handleCategoryChange(productInformation["Product ID"], e.target.value)}
                            >
                                <option value={productInformation.CategoryID}>{productInformation.Category}</option>
                                {categories
                                    .filter(category => category._id !== productInformation.CategoryID)
                                    .map(category => (
                                        <option key={category._id} value={category._id}>{category.Category}</option>
                                    ))}
                            </select>
                            <br />
                            <b>Description: </b><br />
                            <textarea
                                className="AdminDescriptionProduct"
                                value={descriptions[productInformation["Product ID"]] || ''}
                                onChange={(e) => handleInputChange(productInformation["Product ID"], "Description", e.target.value)}
                            ></textarea><br />
                            <Button variant="success" onClick={() => handleSave(productInformation["Product ID"])}>Save</Button>
                        </div>
                        <div>
                            <span><b>Price: </b>
                                <input
                                    type="number"
                                    value={prices[productInformation["Product ID"]] || ''}
                                    onChange={(e) => handleInputChange(productInformation["Product ID"], "Price", e.target.value)}
                                /></span><br /><br />
                            <span><b>Link to pic: </b>
                                <input
                                    value={links[productInformation["Product ID"]] || ''}
                                    onChange={(e) => handleInputChange(productInformation["Product ID"], "Link", e.target.value)}
                                />
                            </span><br /><br />
                            <div>Bought By:</div>
                            <div className="dynamicTableContainerProducts">
                                <DynamicTable
                                    source="AdminProducts"
                                    columns={[
                                        { key: "User First Name", label: "User First Name" },
                                        { key: "Quantity", label: "Quantity" },
                                        { key: "Order Date", label: "Order Date" }
                                    ]}
                                    data={getProductInformationForTable(productInformation)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="secondary" onClick={logOut}>Log Out</Button>
        </>
    );
}

export default AdminProducts;