const express = require('express');
const Router = express.Router();
const adminService = require('../Services/adminService');
const UsersService = require('../Services/usersService');
const verifyAdmin = require('../Middlewares/verifyAdmin'); // Import the verifyAdmin middleware

// Load environment variables
require('dotenv').config();

// category routes
Router.get('/categories', verifyAdmin, async (req, res) => { // This is a route that returns all categories if the user is an admin
    try {
        const categories = await adminService.getCategoriesService();
        return res.json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.post('/categories', verifyAdmin, async (req, res) => { // This is a route that adds a new category if the user is an admin
    const Category = req.body.Category;
    try {
        if (!Category) {
            return res.status(400).json({ error: 'Please enter category' });
        }
        const body = { Category: Category };
        const newCategory = await adminService.addCategoryService(body);
        return res.status(201).json({ success: true, message: 'Category added successfully', category: newCategory });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.put('/categories/:id', verifyAdmin, async (req, res) => { // This is a route that updates a category if the user is an admin
    const id = req.params.id;
    const Category = req.body.Category;
    try {
        if (!Category) {
            return res.status(400).json({ error: 'Please enter category' });
        }
        const body = { Category: Category };
        const updatedCategory = await adminService.updateCategoryService(id, body);
        return res.json({ success: true, message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.delete('/categories/:id', verifyAdmin, async (req, res) => { // This is a route that deletes a category if the user is an admin
    const id = req.params.id;
    try {
        const deletedCategory = await adminService.deleteCategoryService(id);
        return res.json({ success: true, message: 'Category deleted successfully', category: deletedCategory });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

////////////////////////////////////////

// user routes
Router.get('/users', verifyAdmin, async (req, res) => { // This is a route that returns all users if the user is an admin
    try {
        const users = await adminService.getUsersService();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.get('/users-information', verifyAdmin, async (req, res) => { // This is a route that returns all users information if the user is an admin
    try {
        const users = await adminService.getUsersInformationService();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.post('/users', verifyAdmin, async (req, res) => { // This is a route that adds a new user if the user is an admin
    const FirstName = req.body["First Name"];
    const LastName = req.body["Last Name"];
    const Username = req.body.Username;
    const Password = req.body.Password;
    try {
        if (!FirstName || !LastName || !Username || !Password) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        let RegistrationDate // This is the date the user registered or the current date if the user did not specify a date
        req.body["Registration Date"] ? RegistrationDate = req.body["Registration Date"] : RegistrationDate = new Date();
        const body = {
            "First Name": FirstName,
            "Last Name": LastName,
            "Username": Username,
            "Password": Password,
            "admin": false,
            "Registration Date": RegistrationDate,
        }
        const newUser = await adminService.addUserService(body);
        return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// A route to update a user
Router.put('/users/:id', verifyAdmin, async (req, res) => { // This is a route that updates a user if the user is an admin
    const id = req.params.id;
    const FirstName = req.body["First Name"];
    const LastName = req.body["Last Name"];
    const Username = req.body.Username;
    const Password = req.body.Password;
    const RegistrationDate = req.body["Registration Date"];
    const allowOthersToSeeMyOrders = req.body.allowOthersToSeeMyOrders;
    try {
        let body = {}       
        // Check if the user entered the field and add it to the body object
        FirstName ? body["First Name"] = FirstName : null;
        LastName ? body["Last Name"] = LastName : null;
        Username ? body.Username = Username : null;
        Password ? body.Password = Password : null;
        RegistrationDate ? body["Registration Date"] = RegistrationDate : null;
        allowOthersToSeeMyOrders ? body.allowOthersToSeeMyOrders = allowOthersToSeeMyOrders : null;

        const updatedUser = await adminService.updateUserService(id, body);
        return res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


Router.delete('/users/:id', verifyAdmin, async (req, res) => { // This is a route that deletes a user if the user is an admin
    const id = req.params.id;
    try {
        const deletedUser = await adminService.deleteUserService(id);
        return res.json({ success: true, message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

////////////////////////////////////////

// product routes
Router.get('/products', verifyAdmin, async (req, res) => { // This is a route that returns all products if the user is an admin
    try {
        const products = await adminService.getProductsService();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// get products information including a Bought Buy section
Router.get('/products-information', verifyAdmin, async (req, res) => { // This is a route that returns all products information if the user is an admin
    try {
        const products = await adminService.getProductsInformationService();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.post('/products', verifyAdmin, async (req, res) => { // This is a route that adds a new product if the user is an admin
    try {
        const Title = req.body.Title;
        const Category = req.body.Category;
        const Description = req.body.Description;
        const Price = req.body.Price;
        const LinkToPic = req.body["Link to pic"];
        if (!Title || !Category || !Description || !Price || !LinkToPic) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        const body = {
            Title: Title,
            Category: Category,
            Description: Description,
            Price: Price,
            "Link to pic": LinkToPic,
        }
        const newProduct = await adminService.addProductService(body);
        return res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// A route to update a product
Router.put('/products/:id', verifyAdmin, async (req, res) => { // This is a route that updates a product if the user is an admin
    const id = req.params.id;
    const Title = req.body.Title;
    const Category = req.body.Category;
    const CategoryID = req.body.CategoryID;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const LinkToPic = req.body["Link to pic"];
    try {
        const body = {};        
        // Check if the user entered the field and add it to the body object
        Title ? body.Title = Title : null;
        Category ? body.Category = Category : null;
        CategoryID ? body.CategoryID = CategoryID : null;
        Description ? body.Description = Description : null;
        Price ? body.Price = Price : null;
        LinkToPic ? body["Link to pic"] = LinkToPic : null;

        const updatedProduct = await adminService.updateProductService(id, body);
        return res.json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.delete('/products/:id', verifyAdmin, async (req, res) => { // This is a route that deletes a product if the user is an admin
    const id = req.params.id;
    try {
        const deletedProduct = await adminService.deleteProductService(id);
        return res.json({ success: true, message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


////////////////////////////////////////

// order routes

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
Router.post('/:id/orders', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const orders = req.body;
        const newOrder = await UsersService.addOrderService(id, orders);
        return res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// A route for getting all orders
Router.get('/orders', verifyAdmin, async (req, res) => {
    try {
        const orders = await adminService.getOrdersService();
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// A route for getting all orders of a specific user
Router.get('/:id/orders', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const orders = await adminService.getUserOrdersService(id);
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


Router.put('/orders/:id', verifyAdmin, async (req, res) => {
    const order_id = req.params.id;
    const order = req.body;
    try {
        const updatedOrder = await adminService.updateOrderService(order_id, order);
        return res.json({ success: true, message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// Note: the id is the id of the order,
// not the id of the user who made the order
Router.delete('/orders/:id', verifyAdmin, async (req, res) => {
    const order_id = req.params.id;
    try {
        const deletedOrder = await adminService.deleteOrdersService(order_id);
        return res.json({ success: true, message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// delete all of the orders of a user
Router.delete('/:id/orders', verifyAdmin, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedOrders = await adminService.deleteAllOrdersOfUserService(id);
        return res.json({ success: true, message: 'Orders deleted successfully', orders: deletedOrders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


////////////////////////////////////////
// statistics route

// A route for getting statistics information regarding the total number of products sold
 Router.get('/statistics/total-products-sold', verifyAdmin, async (req, res) => {
    try {
        const statistics = await adminService.getStatisticsTotalProductsSoldService();
        return res.json(statistics);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

Router.get('/statistics/users-orders', verifyAdmin, async (req, res) => {
    try {
        const statistics = await adminService.getStatisticsUsersOrdersService();
        return res.json(statistics);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = Router;