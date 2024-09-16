LoginRepository = require('../Repositories/LoginRepository');

const getUsersService = () => {
    return LoginRepository.getUsersRepository();
}

module.exports = { getUsersService }; // This is a custom middleware function that exports the getUsersService function.