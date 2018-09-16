const express = require('express');
const router = express.Router();
const tournament = require('../../tools/challonge').tournament;
const participant = require('../../tools/challonge').participant;
const match = require('../../tools/challonge').match;
const quakestats = require('../../tools/quakestats');
const validateTournament = require('../../validation/tournament');

router.get('/:id', (req, res) => {
  tournament
    .get(req.params.id)
    .then(info => res.json(info))
    .catch(err => res.json(err));
});

router.post('/create', (req, res) => {
  const { errors, isValid } = validateTournament(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  tournament
    .create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
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

router.get('/:id/rounds', (req, res) => {
  match
    .getAll(req.params.id)
    .then(matches => {
      const roundCount = Math.max.apply(
        Math,
        matches.map(match => match.round)
      );
      let rounds = [];
      for (let i = 0; i < roundCount; i++) {
        rounds[i] = matches.filter(match => match.round === i + 1);
      }
      res.json(rounds);
    })
    .catch(err => res.json(err));
});

router.post('/:id/signup', (req, res) => {
  quakestats
    .search(req.body.name)
    .then(data => {
      if (
        data.length > 0 &&
        data.find(player => player.entityName === req.body.name)
      ) {
        participant
          .signUp(req.params.id, req.body)
          .then(data => res.json(data))
          .catch(err => res.json(err));
      } else {
        res.status(400).json({ name: 'Player not found.' });
      }
    })
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
