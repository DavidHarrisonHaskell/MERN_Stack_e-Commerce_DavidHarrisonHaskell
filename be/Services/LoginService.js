LoginRepository = require('../Repositories/LoginRepository');

const getUsersService = () => {
    return LoginRepository.getUsersRepository();
}

const getUsersServiceById = (id) => {
    return LoginRepository.getUsersRepositoryById(id);
}

const addUserService = (body) => {
    return LoginRepository.addUserRepository(body);
}

module.exports = { getUsersService, getUsersServiceById, addUserService }; // This is a custom middleware function that exports the getUsersService function.