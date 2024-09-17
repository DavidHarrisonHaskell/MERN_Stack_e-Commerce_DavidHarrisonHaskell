const categoriesModel = require('../Models/CategoriesModel');

const getCategoriesRepository = async () => {
    const categories = await categoriesModel.find({});
    return categories;
}

const addCategoryRepository = async (body) => {
    const category = new categoriesModel(body);
    await category.save();
    return category;
}

const updateCategoryRepository = async (id, body) => {
    const updatedCategory = await categoriesModel.findByIdAndUpdate(id, body, { new: true });
    return updatedCategory;
}

const deleteCategoryRepository = async (id) => {
    const deletedCategory = await categoriesModel.findByIdAndDelete(id);
    return deletedCategory;
}

module.exports = {
    getCategoriesRepository,
    addCategoryRepository,
    updateCategoryRepository,
    deleteCategoryRepository
}; // This is a custom middleware function that exports the getCategoriesRepository function.