const express = require('express');
const Router = express.Router();
const UsersService = require('../Services/usersService');
const verifyUser = require('../Middlewares/verifyUser');

// Load environment variables
require('dotenv').config();

// users routes

// user route for getting his own information from the database with the route name as his id
Router.get('/:id', verifyUser, async (req, res) => {
    try {
        const user = await UsersService.getUserInformationService(req.params.id);
        return res.json({ success: true, user: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// user route for updating his own information in the database with route name as his id
Router.put('/:id', verifyUser, async (req, res) => {
    const id = req.params.id;
    try {
        if (req.body["First Name"] === "" || req.body["Last Name"] === "" || req.body.Username === "" || req.body.Password === "") {
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        const body = {
            "First Name": req.body["First Name"],
            "Last Name": req.body["Last Name"],
            "Username": req.body.Username,
            "Password": req.body.Password,
            "allowOthersToSeeMyOrders": req.body.allowOthersToSeeMyOrders
        };
        const updatedUser = await UsersService.updateUserService(id, body);
        return res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// user route for getting all of his orders from the database
Router.get('/:id/orders', verifyUser, async (req, res) => {
    try {
        const userOrders = await UsersService.getUserOrdersService(req.params.id);
        console.log('userOrders: ', userOrders);
        return res.json({ success: true, userOrders: userOrders, hello: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// user route for getting all of the products from the database

// However, the number of sold units for a given product 
// only represents the number of units sold to users who 
// have allowed their information to be shared. 

// The number of units sold to the user viewing the product are represented in the
// number of units sold. This is regardless of whether the user has allowed 
// his or her information to be shared.
Router.get('/:id/products', verifyUser, async (req, res) => {
    try {
        const products = await UsersService.getProductsService(req.params.id);
        return res.json({ success: true, products: products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// the route for posting an order should be /:id/orders and receives in its body
// an array of objects with the following structure:
// const ProductInformationSchema = new mongoose.Schema({
//     "ProductID": {
//         type: String,
//     },
//     "Product Title": {
//         type: String,
//     },
//     "Quantity": {
//         type: Number,
//     }
// }, {
//     versionKey: false
// });
// =>  "Orders": {
//         type: [ProductInformationSchema],
//     }
Router.post('/:id/orders', verifyUser, async (req, res) => {
    try {
        const id = req.params.id;
        const orders = req.body;
        const newOrder = await UsersService.addOrderService(id, orders);
        return res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = Router;
