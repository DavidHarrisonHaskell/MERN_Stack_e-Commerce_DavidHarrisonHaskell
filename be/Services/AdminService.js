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
    deleteUserService,
    ///////////////////////
    getProductsService,
    addProductService,
    deleteProductService
}; // This is a custom middleware function that exports the getCategoriesService function.