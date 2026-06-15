const express = require('express');
const router = express.Router();
const pool = require('../db');

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
        const result = await pool.query('SELECT * FROM menue ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single menu item
router.get('/menue/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menue WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Menu item not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a menu item
router.post('/menue', async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO menue (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a menu item
router.put('/menue/:id', async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
        const result = await pool.query(
            'UPDATE menue SET name = COALESCE($1, name), description = COALESCE($2, description), price = COALESCE($3, price), category = COALESCE($4, category), updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [name, description, price, category, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Menu item not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a menu item
router.delete('/menue/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM menue WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
