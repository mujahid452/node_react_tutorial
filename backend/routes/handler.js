const express = require('express');
const router = express.Router();
const Menue = require('../models/Menue');

router.get('/tweets', (req, res) => {
    const str = [
        {
            "name": "Codr Kai",
            "msg": "This is my first tweet!",
            "username": "codrkai"
        },
        {
            "name": "Samantha Kai",
            "msg": "React JS is so simple!",
            "username": "samanthakai"
        },
        {
            "name": "John K",
            "msg": "Sweep the leg!",
            "username": "johnk"
        }
    ];
    res.end(JSON.stringify(str));
});

router.post('/addTweet', (req, res) => {
    res.end('NA');
});

// Menue CRUD Routes

// GET all menu items
router.get('/menue', async (req, res) => {
    try {
        const items = await Menue.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single menu item
router.get('/menue/:id', async (req, res) => {
    try {
        const item = await Menue.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Menu item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a menu item
router.post('/menue', async (req, res) => {
    const item = new Menue({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a menu item
router.put('/menue/:id', async (req, res) => {
    try {
        const item = await Menue.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Menu item not found' });

        if (req.body.name != null) item.name = req.body.name;
        if (req.body.description != null) item.description = req.body.description;
        if (req.body.price != null) item.price = req.body.price;
        if (req.body.category != null) item.category = req.body.category;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a menu item
router.delete('/menue/:id', async (req, res) => {
    try {
        const item = await Menue.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Menu item not found' });
        await item.remove();
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;