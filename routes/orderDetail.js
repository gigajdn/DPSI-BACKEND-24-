const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all order details
router.get('/', async (req, res) => {
    try {
        const orderDetails = await db.OrderDetail.findAll();
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order detail by ID
router.get('/:id', async (req, res) => {
    try {
        const orderDetail = await db.OrderDetail.findByPk(req.params.id);
        if (orderDetail) {
            res.json(orderDetail);
        } else {
            res.status(404).json({ error: 'OrderDetail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new order detail
router.post('/', async (req, res) => {
    try {
        const newOrderDetail = await db.OrderDetail.create(req.body);
        res.status(201).json(newOrderDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
