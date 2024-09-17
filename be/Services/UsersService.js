UsersRepository = require('../Repositories/UsersRepository');

const getUsersService = () => {
    return UsersRepository.getUsersRepository();
}

const getUsersServiceById = (id) => {
    return UsersRepository.getUsersRepositoryById(id);
}

const addUserService = (body) => {
    return UsersRepository.addUserRepository(body);
}

module.exports = { getUsersService, getUsersServiceById, addUserService }; // This is a custom middleware function that exports the getUsersService function.