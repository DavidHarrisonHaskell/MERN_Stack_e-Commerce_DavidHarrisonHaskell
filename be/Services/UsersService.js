UsersRepository = require('../Repositories/usersRepository');

// admin: category service functions

const getUsersService = () => {
    return UsersRepository.getUsersRepository();
}

const getUsersServiceById = (id) => {
    return UsersRepository.getUsersRepositoryById(id);
}

const addUserService = (body) => {
    return UsersRepository.addUserRepository(body);
}

// user: service functions

const getUserInformationService = (id) => {
    return UsersRepository.getUsersRepositoryById(id);
}

const updateUserService = (id, body) => {
    return UsersRepository.updateUserRepository(id, body);
}

module.exports = {
    getUsersService,
    getUsersServiceById,
    addUserService,
    //////////////////////////
    getUserInformationService,
    updateUserService
}; // This is a custom middleware function that exports the getUsersService function.