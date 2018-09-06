const express = require('express');
const router = express.Router();
const tournament = require('../../tools/challonge').tournament;
const participant = require('../../tools/challonge').participant;
const match = require('../../tools/challonge').match;

router.get('/:id', (req, res) => {
  tournament
    .get(Number(req.params.id))
    .then(data => res.json(data))
    .catch(err => res.json(err));
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

router.get('/:id/participants', (req, res) => {
  participant
    .getAll(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get('/:id/participants/:playerId', (req, res) => {
  participant
    .get(req.params)
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

router.get('/:id/matches', (req, res) => {
  match
    .getAll(req.params.id)
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
