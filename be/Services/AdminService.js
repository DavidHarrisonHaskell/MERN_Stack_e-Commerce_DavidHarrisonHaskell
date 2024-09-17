adminRepository = require('../Repositories/AdminRepository');

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

const addUserService = (body) => {
    return adminRepository.addUserRepository(body);
}

///////////////////////

// product service functions
const getProductsService = () => {
    return adminRepository.getProductsRepository();
}



module.exports = {
    getCategoriesService,
    addCategoryService,
    updateCategoryService,
    deleteCategoryService,
    addUserService,
    getUsersService,
    getProductsService
}; // This is a custom middleware function that exports the getCategoriesService function.