const express = require('express');
const router = express.Router();
const adminService = require('../Services/AdminService');
const verifyAdmin = require('../Middlewares/verifyAdmin'); // Import the verifyAdmin middleware

// Load environment variables
require('dotenv').config();

// category routes
router.get('/categories', verifyAdmin, async (req, res) => { // This is a route that returns all categories if the user is an admin
    try {
        const categories = await adminService.getCategoriesService();
        return res.json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/categories', verifyAdmin, async (req, res) => { // This is a route that adds a new category if the user is an admin
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

router.put('/categories/:id', verifyAdmin, async (req, res) => { // This is a route that updates a category if the user is an admin
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

router.delete('/categories/:id', verifyAdmin, async (req, res) => { // This is a route that deletes a category if the user is an admin
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
router.get('/users', verifyAdmin, async (req, res) => { // This is a route that returns all users if the user is an admin
    try {
        const users = await adminService.getUsersService();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/users', verifyAdmin, async (req, res) => { // This is a route that adds a new user if the user is an admin
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
        console.log("req.body['Registration Date']", req.body["Registration Date"])
        const body = {
            "First Name": FirstName,
            "Last Name": LastName,
            "Username": Username,
            "Password": Password,
            "admin": false,
            "Registration Date": RegistrationDate,
            "Products Bought": []
        }
        const newUser = await adminService.addUserService(body);
        return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// TODO: ENTER PUT SECTION OF CODE for updating user

router.delete('/users/:id', verifyAdmin, async (req, res) => { // This is a route that deletes a user if the user is an admin
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
router.get('/products', verifyAdmin, async (req, res) => { // This is a route that returns all products if the user is an admin
    try {
        const products = await adminService.getProductsService();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/products', verifyAdmin, async (req, res) => { // This is a route that adds a new product if the user is an admin
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
            "Bought Buy": []
        }
        const newProduct = await adminService.addProductService(body);
        return res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// TODO: ENTER PUT SECTION OF CODE for updating product

router.delete('/products/:id', verifyAdmin, async (req, res) => { // This is a route that deletes a product if the user is an admin
    const id = req.params.id;
    try {
        const deletedProduct = await adminService.deleteProductService(id);
        return res.json({ success: true, message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// TODO: Make a route for getting statistics

module.exports = router;