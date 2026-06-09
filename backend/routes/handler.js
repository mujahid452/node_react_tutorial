const express = require('express');
const router = express.Router();
const tweets = require('../data/tweets');

router.get('/tweets', (req, res) => {
    res.json(tweets);
});

router.post('/addTweet', (req, res) => {
    res.end('NA');
});

module.exports = router;
