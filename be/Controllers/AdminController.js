const express = require('express');
const router = express.Router();
const adminService = require('../Services/AdminService');
const verifyAdmin = require('../Middlewares/verifyAdmin'); // Import the verifyAdmin middleware
const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();

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

module.exports = router;