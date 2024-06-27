const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all shippers
router.get('/', async (req, res) => {
    try {
        const shippers = await db.Shipper.findAll();
        res.json(shippers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get shipper by ID
router.get('/:id', async (req, res) => {
    try {
        const shipper = await db.Shipper.findByPk(req.params.id);
        if (shipper) {
            res.json(shipper);
        } else {
            res.status(404).json({ error: 'Shipper not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new shipper
router.post('/', async (req, res) => {
    try {
        const newShipper = await db.Shipper.create(req.body);
        res.status(201).json(newShipper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
