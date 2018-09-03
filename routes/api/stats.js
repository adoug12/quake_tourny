const express = require('express');
const router = express.Router();
const quakestats = require('../../tools/quakestats');

// @route GET api/stats/player/:alias
// @desc Retrieves a player's stats using the supplied alias
router.get('/player/:alias', (req, res) => {
  quakestats
    .player(req.params.alias)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
