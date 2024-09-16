const LoginModel = require('../Models/LoginModel'); // This imports the LoginModel from the Models folder.

const getUsersRepository = async () => {
    try {
        const result =  await LoginModel.find({}) ; // This returns all the users from the database.
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = { getUsersRepository }; // This is a custom middleware function that exports the getUsersRepository function.