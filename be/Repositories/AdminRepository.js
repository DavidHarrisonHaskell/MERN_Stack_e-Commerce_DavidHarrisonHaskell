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

const deleteProductRepository = async (id) => {
    const result = await ProductsModel.findByIdAndDelete(id); // This deletes the product with the specified id from the database.
    return result;
}

////////////////////////////////////////

// orders repository functions

const getOrdersRepository = async () => {
    const orders = await OrdersModel.find({});
    return orders;
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
    deleteUserRepository,
    ///////////////////////
    getProductsRepository,
    addProductRepository,
    deleteProductRepository,
    ///////////////////////
    getOrdersRepository
}; // This is a custom middleware function that exports the getCategoriesRepository function.