const express = require('express');
const router = express.Router();

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
    const { name, msg, username } = req.body;
    if (!name || !msg || !username) {
        return res.status(400).json({ error: 'name, msg, and username are required' });
    }
    if (typeof name !== 'string' || typeof msg !== 'string' || typeof username !== 'string') {
        return res.status(400).json({ error: 'name, msg, and username must be strings' });
    }
    if (name.length > 100 || msg.length > 280 || username.length > 50) {
        return res.status(400).json({ error: 'Field length exceeds maximum allowed' });
    }
    res.status(501).json({ error: 'Not implemented' });
});

module.exports = router;