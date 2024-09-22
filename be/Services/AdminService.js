const { get } = require('mongoose');

adminRepository = require('../Repositories/adminRepository');
UsersRepository = require('../Repositories/usersRepository');

// category service functions
const getCategoriesService = () => {
    return adminRepository.getCategoriesRepository();
}

const addCategoryService = (body) => {
    return adminRepository.addCategoryRepository(body);
}

const updateCategoryService = (id, body) => {
    return adminRepository.updateCategoryRepository(id, body);
}

const deleteCategoryService = (id) => {
    return adminRepository.deleteCategoryRepository(id);
}




///////////////////////

// user service functions
const getUsersService = () => {
    return adminRepository.getUsersRepository();
}

const getUsersInformationService = async () => {
    // need to find the Products Bought information for each user 
    // and return the user information with the Products Bought information
    const allOrders = await UsersRepository.getAllOrdersRepository();
    let allUsers = await adminRepository.getUsersRepository();
    allUsers = allUsers.filter(user => user.admin === false);

    const allUsersInformation = allUsers.map(user => {
        let userInformation = {
            "User ID": user._id,
            "First Name": user["First Name"],
            "Last Name": user["Last Name"],
            "allowOthersToSeeMyOrders": user.allowOthersToSeeMyOrders,
            "Products Bought": []
        }
        // get all the orders of the user
        const userOrders = allOrders.filter(order => order.UserID == user._id);
        //find all the products bought by the user
        let productsBought = userOrders.flatMap(order =>
            order.Orders.map(product => ({
                "ProductID": product.ProductID,
                "Product Title": product["Product Title"],
                "Quantity": product.Quantity,
                "Order Date": order["Order Date"]
            }))
        )
        userInformation["Products Bought"] = productsBought;
        return userInformation;
    })
    return allUsersInformation;
}

const addUserService = (body) => {
    return adminRepository.addUserRepository(body);
}

const updateUserService = (id, body) => {
    return adminRepository.updateUserRepository(id, body);
}

const deleteUserService = async (id) => {
    // delete the user from the database
    const deleted_user = await adminRepository.deleteUserRepository(id);
    console.log("deleted_user", deleted_user);
    // delete all of that user's orders from the database
    const deleted_orders = await adminRepository.deleteAllOrdersOfUserRepository(id);
    console.log("deleted_orders", deleted_orders);
    return { deleted_user, deleted_orders };
}


///////////////////////

// products service functions
const getProductsService = () => {
    return adminRepository.getProductsRepository();
}

const getProductsInformationService = async () => {
    const allOrders = await UsersRepository.getAllOrdersRepository();
    const allProducts = await adminRepository.getProductsRepository();

    const allProductsInformation = allProducts.map(product => {
        let productInformation = {
            "Product ID": product._id,
            "Title": product.Title,
            "Category": product.Category,
            "Description": product.Description,
            "Price": product.Price,
            "Link to pic": product["Link to pic"],
            "Bought By": []
        }
        // get all the orders of the product
        const productOrders = allOrders.filter(order =>
            order.Orders.some(orderProduct => orderProduct.ProductID == product._id)
        );
        //find all the orders of the product
        let orders = productOrders.map(order => {
            the_product_bought = order.Orders.find(orderProduct => orderProduct.ProductID == product._id)
            return {
                "User ID": order.UserID,
                "User First Name": order["User First Name"],
                "ProductID": the_product_bought.ProductID,
                "Product Title": the_product_bought["Product Title"],
                "Quantity": the_product_bought.Quantity,
                "Order Date": order["Order Date"]
            }
        })
        productInformation["Bought By"] = orders;
        return productInformation;
    })
    return allProductsInformation;
}

const addProductService = (body) => {
    return adminRepository.addProductRepository(body);
}

const updateProductService = (id, body) => {
    return adminRepository.updateProductRepository(id, body);
}

const deleteProductService = (id) => {
    return adminRepository.deleteProductRepository(id);
}

///////////////////////

// orders service functions

const getOrdersService = () => {
    return adminRepository.getOrdersRepository();
}

const getUserOrdersService = (id) => {
    return adminRepository.getUserOrdersRepository(id);
}

const updateOrderService = (id, body) => {
    return adminRepository.updateOrderRepository(id, body);
}

const deleteOrdersService = (id) => {
    return adminRepository.deleteOrdersRepository(id);
}

const deleteAllOrdersOfUserService = (id) => {
    return adminRepository.deleteAllOrdersOfUserRepository(id);
}

// statistics service function
const getStatisticsTotalProductsSoldService = async () => {
// data for a pie chart of all the products sold based on product Title
    const allOrders = await UsersRepository.getAllOrdersRepository();
    const allProducts = await adminRepository.getProductsRepository();
    let productsSold = allProducts.map(product => {
        let productSold = {
            "Product ID": product._id,
            "Product Title": product.Title,
            "Quantity Sold": 0
        }
        // get all the orders of the product
        const productOrders = allOrders.filter(order =>
            order.Orders.some(orderProduct => orderProduct.ProductID == product._id)
        );
        //find all the orders of the product
        let orders = productOrders.map(order => {
            the_product_bought = order.Orders.find(orderProduct => orderProduct.ProductID == product._id)
            return the_product_bought.Quantity
        })
        productSold["Quantity Sold"] = orders.reduce((a, b) => a + b, 0);
        return productSold;
    })
    return productsSold;
}

const getStatisticsUsersOrdersService = async () => {
    // data for a bar chart of all the users orders based on the user's ID
    // and each user's orders should be grouped by the total quantity of each type of product
    const allOrders = await UsersRepository.getAllOrdersRepository(); // get all the orders
    let allUsers = await adminRepository.getUsersRepository();
    allUsers = allUsers.filter(user => user.admin === false); // only get the users not the admin
    let usersOrders = allUsers.map(user => { // for each user
        let userOrders = { // create an object with some of the user's information
            "User ID": user._id,
            "First Name": user["First Name"],
            "Last Name": user["Last Name"],
            "Orders": []
        }
        // get all the orders of the user
        const userOrdersList = allOrders.filter(order => order.UserID == user._id);
        //find all the products bought by the user including the total quantity of each product bought 
        // by the user for all orders of the user
        // and the product title and the product ID
        // FIXME: make the function work to get the correct statistics
        let orders = userOrdersList.flatMap(order =>
            order.Orders.map(product => ({
                "ProductID": product.ProductID,
                "Product Title": product["Product Title"],
                "Quantity": product.Quantity
            }))
        )
        // get the total quantity of each type of product and only list each product once
        let aggregatedOrders = orders.reduce((acc, order) => { // aggregate the orders
            let existingOrder = acc.find(o => o["ProductID"] == order["ProductID"]); // check if the order already exists
            if (existingOrder) { // if the order already exists
                existingOrder["Quantity"] += order["Quantity"]; // add the quantity of the order to the existing order
            } else { // if the order does not exist
                acc.push(order); // add the order to the list of orders
            }
            return acc;
        }, []);
        userOrders["Orders"] = Object.values(aggregatedOrders);
        return userOrders;
    }
    )
    return usersOrders;
}


module.exports = {
    getCategoriesService,
    addCategoryService,
    updateCategoryService,
    deleteCategoryService,
    ///////////////////////
    addUserService,
    getUsersService,
    getUsersInformationService,
    updateUserService,
    deleteUserService,
    ///////////////////////
    getProductsService,
    getProductsInformationService,
    addProductService,
    updateProductService,
    deleteProductService,
    ///////////////////////
    getOrdersService,
    getUserOrdersService,
    updateOrderService,
    deleteOrdersService,
    deleteAllOrdersOfUserService,
    ///////////////////////
    getStatisticsTotalProductsSoldService,
    getStatisticsUsersOrdersService
}; // This is a custom middleware function that exports the getCategoriesService function.