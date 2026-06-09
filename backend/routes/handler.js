const express = require('express');
const router = express.Router();

router.get('/tweets', (req, res, next) => {
    try {
        const tweets = [
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
        res.json(tweets);
    } catch (err) {
        next(err);
    }
});

router.post('/addTweet', (req, res, next) => {
    try {
        if (!req.body || !req.body.msg) {
            return res.status(400).json({ error: 'Bad Request', message: 'Tweet message is required' });
        }
        res.status(501).json({ error: 'Not Implemented', message: 'This endpoint is not yet implemented' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;