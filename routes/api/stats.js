const express = require('express');
const router = express.Router();
const quakestats = require('../../tools/quakestats');

router.get('/search/:alias', (req, res) => {
  quakestats
    .search(req.params.alias)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

// @route GET api/stats/player/:alias
// @desc Retrieves a player's stats using the supplied alias
router.get('/player/:alias', (req, res) => {
  quakestats
    .player(req.params.alias)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
