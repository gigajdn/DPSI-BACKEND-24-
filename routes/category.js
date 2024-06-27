const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await db.Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await db.Category.findByPk(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new category
router.post('/', async (req, res) => {
    try {
        const newCategory = await db.Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
