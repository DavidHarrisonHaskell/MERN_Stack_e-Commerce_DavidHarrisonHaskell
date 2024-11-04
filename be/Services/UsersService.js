UsersRepository = require('../Repositories/usersRepository');

// admin: category service functions

const getUsersService = () => {
    return UsersRepository.getUsersRepository();
}

const getUsersServiceById = (id) => {
    return UsersRepository.getUsersRepositoryById(id);
}

const addUserService = (body) => {
    return UsersRepository.addUserRepository(body);
}

// user: service functions

const getUserInformationService = (id) => {
    return UsersRepository.getUsersRepositoryById(id);
}

const updateUserService = (id, body) => {
    return UsersRepository.updateUserRepository(id, body);
}

const getUserOrdersService = (id) => {
    return UsersRepository.getUserOrdersRepository(id);
}

const getProductsService = async (id) => {
    const allProducts = await UsersRepository.getProductsRepository();
    const allUsers = await UsersRepository.getUsersRepository();
    const allOrders = await UsersRepository.getAllOrdersRepository();
    const productsInformationArray = allProducts.map(product => {
        let productInformation = {
            "ProductID": product._id,
            "Product Title": product.Title,
            "Category": product.Category,
            "Description": product.Description,
            "Price": product.Price,
            "Link to pic": product["Link to pic"],

            // the number of sold should only reflect 
            // the number of units sold to users who have
            // allowed their information to be shared or 
            // the user viewing the product
            "Number of Units Sold": 0
        }
        const filteredUserOrders = allOrders.filter(order => {
            const user = allUsers.find(user => user._id == order.UserID); // find the user who made the order
            // check if the user allows others to see his orders or if the user is the one viewing the product
            // or if the user exists
            return user && (user.allowOthersToSeeMyOrders || user._id === id);
        })

        filteredUserOrders.forEach(singleUserOrder => { // loop through all the orders of the user
            singleUserOrder.Orders.forEach(productOrder => { // loop through all the products in the order
                if (productOrder.ProductID == product._id) { // check if the product in the order is the same as the product
                    productInformation["Number of Units Sold"] += productOrder.Quantity; // add the quantity of the product to the number of units sold
                }
            });
        });
        return productInformation;
    });
    return productsInformationArray;
}

const addOrderService = async (id, orders) => {
    // find the First Name of the user
    const user = await UsersRepository.getUsersRepositoryById(id);
    const body = {
        "UserID": id,
        "User First Name": user["First Name"],
        "Orders": orders,
        "Order Date": new Date()
    }
    return UsersRepository.addOrderRepository(body);

}

module.exports = {
    getUsersService,
    getUsersServiceById,
    addUserService,
    //////////////////////////
    getUserInformationService,
    updateUserService,
    getUserOrdersService,
    getProductsService,
    addOrderService
}; // This is a custom middleware function that exports the getUsersService function.