const express = require('express');
const router = express.Router();
const quakestats = require('../../tools/quakestats');

router.get('/search/:alias', (req, res) => {
  quakestats
    .search(req.params.alias)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get('/player/:alias', (req, res) => {
  quakestats
    .player(req.params.alias)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

// router.get('/games/:alias', (req, res) => {
//   quakestats
//     .games(req.params.alias)
//     .then(data => res.json(data))
//     .catch(err => res.json(err));
// });

// router.get('/game/:id', (req, res) => {
//   quakestats
//     .game(req.params.id)
//     .then(data => res.json(data))
//     .catch(err => res.json(err));
// });

router.get('/matchupHistory', (req, res) => {
  quakestats
    .matchupHistory(req.query.alias1, req.query.alias2)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
