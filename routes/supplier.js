const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await db.Supplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get supplier by ID
router.get('/:id', async (req, res) => {
    try {
        const supplier = await db.Supplier.findByPk(req.params.id);
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new supplier
router.post('/', async (req, res) => {
    try {
        const newSupplier = await db.Supplier.create(req.body);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
