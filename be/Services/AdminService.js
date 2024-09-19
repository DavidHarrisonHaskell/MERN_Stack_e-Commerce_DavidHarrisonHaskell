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

const deleteUserService = (id) => {
    return adminRepository.deleteUserRepository(id);
}


///////////////////////

// product service functions
const getProductsService = () => {
    return adminRepository.getProductsRepository();
}

const addProductService = (body) => {
    return adminRepository.addProductRepository(body);
}

const deleteProductService = (id) => {
    return adminRepository.deleteProductRepository(id);
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
    deleteUserService,
    ///////////////////////
    getProductsService,
    addProductService,
    deleteProductService
}; // This is a custom middleware function that exports the getCategoriesService function.