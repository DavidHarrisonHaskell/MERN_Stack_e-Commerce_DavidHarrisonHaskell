import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import './AdminProducts.css';
import { logout } from "../actions/index.jsx";
import DynamicTable from "../components/DynamicTable.jsx";
import { updateProduct, addProduct } from "../slices/productsSlice.jsx";
import { updateOrder } from "../slices/ordersSlice.jsx";


/* Add the ability to update the Bought By sectio n
    - When the user clicks the save button, check if any orders were changed
    If any orders were changed, update the orders in the database
    If no orders were changed, do nothing
    - Add a state for all orders
    - Make a dropdown for Names of other users in the database
    - choosing that user will change the user ID of the purchaser of that order and 
    then all of the orders will be updated accordingly
    - Make a select option for choosing a different order date
    - Make the quantity of the product editable but don't allow 0, negative numbers or non-numeric values
*/
const AdminProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector(state => state.orders.items);
    const products = useSelector(state => state.products.items);
    const categories = useSelector(state => state.categories.items);
    const users = useSelector(state => state.users.items);

    const [addNewProductFlag, setAddNewProductFlag] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [titles, setTitles] = useState({});
    const [descriptions, setDescriptions] = useState({});
    const [links, setLinks] = useState({});
    const [prices, setPrices] = useState({});

    const [newCategory, setNewCategory] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newLink, setNewLink] = useState('');
    const [newPrice, setNewPrice] = useState(0);


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
        // console.log("titles", titles, "descriptions", descriptions, "links", links, "prices", prices);
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


    const handleDynamicTableSave = (row, rowIndex, updatedRow) => {
        console.log("row", row);
        /* example: {User ID: '66e9800b0294e30b517f218b', User Full Name: 'Joseph Cooper', 
        ProductID: '66e954700294e30b517f2182', Product Title: 'Watch', Quantity: 4, 
        User Full Name: "Joseph Cooper", User ID: "66e9800b0294e30b517f218b"}
        */
        console.log("rowIndex", rowIndex);
        /* example: 0 */
        console.log("updatedRow", updatedRow);
        /* example 1: {User Full Name: 'Joseph Cooper', Quantity: 4, Order Date: '2024-09-19'}
           example 2: {User Full Name: 'Joseph Cooper'}
           Note: it doesn't have to have all of the fields, it can have only one field
        */

        /*
        First, find the order that has the same ._id as the row["Order ID"]
        Then, within order.Orders, find the product that has the same ProductID as the row.ProductID
        Make a variable that uses the spread operator to initialize the order.Orders
        Then, find the product that has the same ProductID as the row.ProductID
        Then, update the product that has the same ProductID as the row.ProductID with the updatedRow
        Then, dispatch the updateOrder action with the updated order

        */
        const originalOrderToUpdate = orders.find(order => order._id === row["Order ID"]);
        let flagToCheckIfChangeOccurred = false;
        let orderToUpdate = { ...originalOrderToUpdate };
        console.log("originalOrderToUpdate", originalOrderToUpdate);
        // Update the User ID and User First Name if Necessary
        if ("User Full Name" in updatedRow && updatedRow["User Full Name"] !== row["User ID"]) {
            const user = users.find(user => user._id === updatedRow["User Full Name"]);
            orderToUpdate = {
                ...orderToUpdate,
                UserID: updatedRow["User Full Name"],
                "User First Name": user["First Name"]
            }
            flagToCheckIfChangeOccurred = true;
        }
        // Update the Order Date if Necessary
        if ("Order Date" in updatedRow && updatedRow["Order Date"] !== row["Order Date"]) {
            console.log("updatedRow.Order Date", updatedRow["Order Date"]);
            orderToUpdate = {
                ...orderToUpdate,
                "Order Date": updatedRow["Order Date"]
            }
            flagToCheckIfChangeOccurred = true;
        }
        // Update the Quantity if Necessary
        const updatedOrders = orderToUpdate.Orders.map(product => {
            if (product.ProductID === row.ProductID) {
                if (updatedRow.Quantity && updatedRow.Quantity !== row.Quantity) {
                    flagToCheckIfChangeOccurred = true;
                }
                return {
                    ...product,
                    Quantity: updatedRow.Quantity || product.Quantity,
                };
            }
            return product;
        });

        orderToUpdate = {
            ...orderToUpdate,
            Orders: updatedOrders
        }
        // Check if the orders were updated
        if (flagToCheckIfChangeOccurred === false) {
            console.log("The orders were not updated");
            return; // Do nothing if the orders were not updated
        }

        // Update the orders if they were updated
        //dispatch to the redux state
        dispatch(updateOrder(orderToUpdate));
        console.log("A change occurred in the orders");
        console.log("orderToUpdate", orderToUpdate);
        // dispatch(updateOrder(updatedOrder));
    }

    const formatDate = (date) => {
        const orderDate = new Date(date);
        const day = String(orderDate.getDate());
        const month = String(orderDate.getMonth() + 1);
        const year = orderDate.getFullYear();
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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
                let user = users.find(user => user._id === order.UserID)
                return {
                    "User ID": order.UserID,
                    "User Full Name": `${user["First Name"]} ${user["Last Name"]}`,
                    "ProductID": the_product_bought.ProductID,
                    "Product Title": the_product_bought["Product Title"],
                    "Quantity": the_product_bought.Quantity,
                    "Order Date": formatDate(order["Order Date"]),
                    "Order ID": order._id
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
        const data = boughtBy.map(product => product);
        return data;
    }

    const handleSaveNewProduct = () => {
        console.log("newCategory", newCategory);
        console.log("newTitle", newTitle);
        console.log("newDescription", newDescription);
        console.log("newLink", newLink);
        console.log("newPrice", newPrice);
        if(newCategory === '' || newTitle === '' || newDescription === '' || newLink === '' || newPrice === 0){
            alert("Please fill all the fields");
            return;
        }
        const newProduct = {
            Title: newTitle,
            Description: newDescription,
            "Link to pic": newLink,
            Price: newPrice,
            CategoryID: newCategory,
            Category: categories.find(category => category._id === newCategory).Category
        }
        console.log("newProduct", newProduct);
        dispatch(addProduct(newProduct)); //TODO: Fix this function
        return
    }

    const handleAddNewProduct = () => {
        setAddNewProductFlag(!addNewProductFlag);
        //clear certain fields after adding a new product
        setNewCategory('');
        setNewTitle('');
        setNewDescription('');
        setNewLink('');
        setNewPrice(0);
    }

    return (
        <>
            <Navbar /><br />
            <div className="adminProductsComponent">
                <h1 className='headerProductsAdmin'><b>Products</b></h1>
                {getProductsInformation().map((productInformation, index) => (
                    <div key={index}>
                        <div className="productInformationContainer">
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
                                <div><b>Bought By:</b></div>
                                <div className="dynamicTableContainerProducts">
                                    <>
                                        <DynamicTable
                                            source="AdminProducts"
                                            columns={[
                                                { key: "User Full Name", label: "User Full Name" },
                                                { key: "Quantity", label: "Quantity" },
                                                { key: "Order Date", label: "Order Date" }
                                            ]}
                                            data={getProductInformationForTable(productInformation)}
                                            onSave={handleDynamicTableSave}
                                            users={users}
                                        />
                                        {/* {console.log("productInformation", productInformation)} */}
                                        {/* {console.log("getProductInformationForTable(productInformation)", getProductInformationForTable(productInformation))} */}
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {addNewProductFlag ? (
                    <div className="productInformationContainer">
                        <div className="leftSideContainerProductAdmin">
                            <span><b>Title: </b>
                                <input
                                    value={newTitle || ''}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </span><br /><br />
                            <span><b>Category: </b></span><br />
                            <select
                                className="wideSelect"
                                value={newCategory || ''}
                                onChange={(e) => setNewCategory(e.target.value)}
                            >
                                <option value="" disabled>Select a category</option>
                                {categories
                                    .map(category => (
                                        <option key={category._id} value={category._id}>{category.Category}</option>
                                    ))}
                            </select>
                            <br />
                            <b>Description: </b><br />
                            <textarea
                                className="AdminDescriptionProduct"
                                value={newDescription || ''}
                                onChange={(e) => setNewDescription(e.target.value)}
                            ></textarea><br />
                            {/*TODO: finish the add product section */}
                            <Button variant="success" onClick={handleSaveNewProduct}>Save</Button>
                        </div>
                        <div>
                            <span><b>Price: </b>
                                <input
                                    type="number"
                                    value={newPrice || ''}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                /></span><br /><br />
                            <span><b>Link to pic: </b>
                                <input
                                    value={newLink || ''}
                                    onChange={(e) => setNewLink(e.target.value)}
                                />
                            </span><br /><br />
                        </div>
                    </div>
                ) : null}
                <br />
                <Button variant="primary" onClick={handleAddNewProduct}>Add New</Button>
                <br /><br />
                <Button variant="secondary" onClick={logOut}>Log Out</Button>
            </div>
        </>
    );
}

export default AdminProducts;