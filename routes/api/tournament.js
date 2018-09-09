const express = require('express');
const router = express.Router();
const tournament = require('../../tools/challonge').tournament;
const participant = require('../../tools/challonge').participant;
const match = require('../../tools/challonge').match;
const quakestats = require('../../tools/quakestats');

router.get('/', (req, res) => {
  tournament
    .getAll()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get('/:id', (req, res) => {
  // get tournament data
  tournament
    .get(req.params.id)
    .then(info => res.json(info))
    .catch(err => res.json(err));
});

router.get('/:id/participants', (req, res) => {
  participant
    .getAll(req.params.id)
    .then(participants => {
      Promise.all(
        participants.map(player =>
          quakestats
            .player(player.name)
            .then(stats => ({ ...player, ...stats }))
        )
      ).then(players => res.json(players));
    })
    .catch(err => res.json(err));
});

router.get('/:id/participants/:playerId', (req, res) => {
  participant
    .get(req.params)
    .then(player => {
      quakestats.player(player.name).then(stats => {
        res.json({ ...player, ...stats });
      });
    })
    .catch(err => res.json(err));
});

router.get('/:id/matches', (req, res) => {
  match
    .getAll(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get('/:id/rounds', (req, res) => {
  match.getAll(req.params.id).then(matches => {
    const roundCount = Math.max.apply(Math, matches.map(match => match.round));
    let rounds = [];
    for (let i = 0; i < roundCount; i++) {
      rounds[i] = matches.filter(match => match.round === i + 1);
    }
    res.json(rounds);
  });
});

router.post('/create', (req, res) => {
  tournament
    .create(req.body)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/:id/process_check_ins', (req, res) => {
  tournament
    .processCheckIns(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/:id/start', (req, res) => {
  tournament
    .start(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/:id/finalize', (req, res) => {
  tournament
    .finalize(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/:id/signup', (req, res) => {
  participant
    .signUp(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.put('/:id/participants/:playerId', (req, res) => {
  participant
    .update(req.params, req.body)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/:id/participants/:playerId/check_in', (req, res) => {
  participant
    .checkIn(req.params)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/:id/participants/:playerId/check_out', (req, res) => {
  participant
    .checkOut(req.params)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.delete('/:id/participants/:playerId/remove', (req, res) => {
  participant
    .remove(req.params)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.delete('/:id/participants', (req, res) => {
  participant
    .clear(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/:id/participants/randomize', (req, res) => {
  participant
    .randomize(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get('/:id/matches/:matchId', (req, res) => {
  match
    .get(req.params)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.put('/:id/matches/:matchId', (req, res) => {
  match
    .submitScore(req.params, req.body)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
