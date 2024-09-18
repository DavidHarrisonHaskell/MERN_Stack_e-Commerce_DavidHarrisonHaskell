const CategoriesModel = require('../Models/CategoriesModel');
const ProductsModel = require('../Models/ProductsModel');
const UsersModel = require('../Models/UsersModel');

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

module.exports = {
    getCategoriesRepository,
    addCategoryRepository,
    updateCategoryRepository,
    deleteCategoryRepository,
    ///////////////////////
    getUsersRepository,
    addUserRepository,
    deleteUserRepository,
    ///////////////////////
    getProductsRepository,
    addProductRepository,
    deleteProductRepository
}; // This is a custom middleware function that exports the getCategoriesRepository function.