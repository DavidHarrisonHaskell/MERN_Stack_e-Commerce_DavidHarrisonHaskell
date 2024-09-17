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

////////////////////////////////////////

// product repository functions

const getProductsRepository = async () => {
    const products = await ProductsModel.find({});
    return products;
}




////////////////////////////////////////

module.exports = {
    getCategoriesRepository,
    addCategoryRepository,
    updateCategoryRepository,
    deleteCategoryRepository,
    getUsersRepository,
    addUserRepository,
    getProductsRepository    
}; // This is a custom middleware function that exports the getCategoriesRepository function.