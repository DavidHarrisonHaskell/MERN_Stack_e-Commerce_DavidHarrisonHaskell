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

const addProductService = (body) => {
    return adminRepository.addProductRepository(body);
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
    addProductService,
    deleteProductService,
    ///////////////////////
    getOrdersService,
    getUserOrdersService,
    updateOrderService,
    deleteOrdersService,
    deleteAllOrdersOfUserService
}; // This is a custom middleware function that exports the getCategoriesService function.