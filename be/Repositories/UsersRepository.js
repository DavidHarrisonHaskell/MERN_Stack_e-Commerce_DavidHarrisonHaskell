const UsersModel = require('../Models/UsersModel'); // This imports the UsersModel from the Models folder.

const getUsersRepository = async () => {
    const result = await UsersModel.find({}); // This returns all the users from the database.
    return result
}

const getUsersRepositoryById = async (id) => {
    const result = await UsersModel.findById(id); // This returns the user with the specified id from the database.
    return result
}
const addUserRepository = async (body) => {
    const user = new UsersModel(body); // This creates a new user object.
    await user.save(); // This saves the new user to the database.
    return user
}

module.exports = { getUsersRepository, getUsersRepositoryById, addUserRepository }; // This is a custom middleware function that exports the getUsersRepository function.