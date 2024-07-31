const express = require('express');
const router = express.Router();
const Order = require('../models/Order.js');

router.post('/place-order', async (req, res) => {
    try {
      const { products, total } = req.body;
  
      const newOrder = new Order({
        products,
        total,
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json({ error: 'Failed to place order' });
    }
  });

  router.get("/alldata", async (req, res) => {
    const query = req.query.new;
    try {
      const orders = query
        ? await Order.find().sort({ _id: -1 }).limit(5)
        : await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    // Find the user document by ID and delete it
    const deletedUser = await Order.findByIdAndDelete(userId);

    // Check if the user was found and deleted
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

  module.exports = router;