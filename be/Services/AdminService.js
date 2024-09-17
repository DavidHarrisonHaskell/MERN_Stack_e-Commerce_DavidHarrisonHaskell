adminRepository = require('../Repositories/AdminRepository');

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

module.exports = { getCategoriesService, addCategoryService, updateCategoryService, deleteCategoryService }; // This is a custom middleware function that exports the getCategoriesService function.