const UsersModel = require('../Models/usersModel'); // This imports the UsersModel from the Models folder.
const OrdersModel = require('../Models/ordersModel'); // This imports the OrdersModel from the Models folder.
const ProductsModel = require('../Models/productsModel'); // This imports the ProductsModel from the Models folder.

// for admin only
const getUsersRepository = async () => {
    const result = await UsersModel.find({}); // This returns all the users from the database.
    return result
}

// for admin and user
const getUsersRepositoryById = async (id) => {
    const result = await UsersModel.findById(id); // This returns the user with the specified id from the database.
    return result
}

// for admin only
const addUserRepository = async (body) => {
    const user = new UsersModel(body); // This creates a new user object.
    await user.save(); // This saves the new user to the database.
    return user
}

// for user only and NOT for admin
// becuase the admin needs to be able to update more fields 
// and the user should only be able to update the fields
// specified in the body
const updateUserRepository = async (id, body) => {
    const user = await UsersModel.findByIdAndUpdate(id, body, { new: true }); // This updates the user with the specified id with the new information.
    return user
}


// for user or admin
const getAllOrdersRepository = async () => {
    const orders = await OrdersModel.find({}).sort({ "Order Date": -1 }); // This returns all the orders from the database.
    return orders
}

// for user and admin
// This function is used to get all of the orders from the database of a specific user
const getUserOrdersRepository = async (id) => {
    const userOrders = await OrdersModel.find({ UserID: id }).sort({ "Order Date": -1 }); // This returns all the orders of the user with the specified id.
    return userOrders
}

// for user only
const getProductsRepository = async () => {
    const products = await ProductsModel.find({}); // This returns all the products from the database.
    return products
}

// for user only
const addOrderRepository = async (body) => {
    const order = new OrdersModel(body); // This creates a new order object.
    await order.save(); // This saves the new order to the database.
    return order
}

module.exports = {
    getUsersRepository,
    getUsersRepositoryById,
    addUserRepository,
    updateUserRepository,
    getAllOrdersRepository,
    getUserOrdersRepository,
    getProductsRepository,
    addOrderRepository
}; // This is a custom middleware function that exports the getUsersRepository function.