const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await db.Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new product
router.post('/', async (req, res) => {
    try {
        const newProduct = await db.Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
