const express = require('express');
const router = express.Router();

// @route GET api/tournaments/test
// @desc Tests tournaments route
router.get('/test', (req, res) => res.json({ msg: 'test message' }));

module.exports = router;
