const CategoriesModel = require('../Models/categoriesModel');
const ProductsModel = require('../Models/productsModel');
const UsersModel = require('../Models/usersModel');
const OrdersModel = require('../Models/ordersModel');

// category repository functions
const getCategoriesRepository = async () => {
    const categories = await CategoriesModel.find({});
    return categories;
}

const addCategoryRepository = async (body) => {
    const category = new CategoriesModel(body);
    await category.save();
    return category;
}

const updateCategoryRepository = async (id, body) => {
    const updatedCategory = await CategoriesModel.findByIdAndUpdate(id, body, { new: true });
    // const updatedProduct = await ProductsModel.updateMany(

    // )
    return updatedCategory;
}

const deleteCategoryRepository = async (id) => {
    const deletedCategory = await CategoriesModel.findByIdAndDelete(id);
    return deletedCategory;
}

////////////////////////////////////////


// user repository functions

const getUsersRepository = async () => {
    const users = await UsersModel.find({});
    return users;
}

const getUsersInformationRepository = async () => {
    const users = await UsersModel.find({});
    return users;
}

const addUserRepository = async (body) => {
    const user = new UsersModel(body);
    await user.save();
    return user;
}

const updateUserRepository = async (id, body) => {
    const updatedUser = await UsersModel.findByIdAndUpdate(id, body, { new: true }); // This updates the user with the specified id from the database.
    return updatedUser;
}

const deleteUserRepository = async (id) => {
    const result = await UsersModel.findByIdAndDelete(id); // This deletes the user with the specified id from the database.
    return result
}


////////////////////////////////////////

// product repository functions

const getProductsRepository = async () => {
    const products = await ProductsModel.find({});
    return products;
}

const addProductRepository = async (body) => {
    const product = new ProductsModel(body);
    await product.save();
    return product;
}

const updateProductRepository = async (id, body) => {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(id, body,
        { new: true }); // This updates the product with the specified id from the database.
    return updatedProduct;
}

const deleteProductRepository = async (id) => {
    const result = await ProductsModel.findByIdAndDelete(id); // This deletes the product with the specified id from the database.
    return result;
}

////////////////////////////////////////

// orders repository functions

const getOrdersRepository = async () => {
    const orders = await OrdersModel.find({}).sort({ "Order Date": -1 });
    return orders;
}

const getUserOrdersRepository = async (id) => {
    const orders = await OrdersModel.find({ UserID: id }).sort({ "Order Date": -1 }); // This returns all the orders of the user with the specified id from the database.
    return orders;
}

const updateOrderRepository = async (id, body) => {
    const updatedOrder = await OrdersModel.findByIdAndUpdate(id, body, { new: true }); // This updates the order with the specified id from the database.
    return updatedOrder;
}

const deleteOrdersRepository = async (id) => {
    const result = await OrdersModel.findByIdAndDelete(id); // This deletes the order with the specified id from the database.
    return result;
}

// delete all of the orders of a user
const deleteAllOrdersOfUserRepository = async (id) => {
    const result = await OrdersModel.deleteMany({ UserID: id }); // This deletes all orders of the user with the specified id from the database.
    return result;
}

module.exports = {
    getCategoriesRepository,
    addCategoryRepository,
    updateCategoryRepository,
    deleteCategoryRepository,
    ///////////////////////
    getUsersRepository,
    getUsersInformationRepository,
    addUserRepository,
    updateUserRepository,
    deleteUserRepository,
    ///////////////////////
    getProductsRepository,
    addProductRepository,
    updateProductRepository,
    deleteProductRepository,
    ///////////////////////
    getOrdersRepository,
    getUserOrdersRepository,
    updateOrderRepository,
    deleteOrdersRepository,
    deleteAllOrdersOfUserRepository,
}; // This is a custom middleware function that exports the getCategoriesRepository function.