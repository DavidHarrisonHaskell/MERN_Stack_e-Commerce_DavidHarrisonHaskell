const UsersModel = require('../Models/usersModel'); // This imports the UsersModel from the Models folder.

// for admin only
const getUsersRepository = async () => {
    const result = await UsersModel.find({}); // This returns all the users from the database.
    return result
}

// for admin and user
const getUsersRepositoryById = async (id) => {
    const result = await UsersModel.findById(id); // This returns the user with the specified id from the database.
    return result
}

// for admin only
const addUserRepository = async (body) => {
    const user = new UsersModel(body); // This creates a new user object.
    await user.save(); // This saves the new user to the database.
    return user
}

// for user only and NOT for admin
// becuase the admin needs to be able to update more fields 
// and the user should only be able to update the fields
// specified in the body
const updateUserRepository = async (id, body) => {
    const user = await UsersModel.findByIdAndUpdate(id, body, {new: true}); // This updates the user with the specified id with the new information.
    return user
}


module.exports = { getUsersRepository, getUsersRepositoryById, addUserRepository, updateUserRepository }; // This is a custom middleware function that exports the getUsersRepository function.