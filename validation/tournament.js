const Validator = require('validator');
const moment = require('moment-timezone');
const isEmpty = require('./is-empty');

const validateTournament = tournamentData => {
  let errors = {};

  tournamentData.name = !isEmpty(tournamentData.name)
    ? tournamentData.name
    : '';
  tournamentData.url = !isEmpty(tournamentData.url) ? tournamentData.url : '';
  tournamentData.start_at = !isEmpty(tournamentData.start_at)
    ? tournamentData.start_at
    : '';
  tournamentData.time_zone = !isEmpty(tournamentData.time_zone)
    ? tournamentData.time_zone
    : '';

  if (!Validator.isLength(tournamentData.name, { min: 2, max: 100 })) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }

  if (Validator.isEmpty(tournamentData.name)) {
    errors.name = 'Name field is required.';
  }

  if (!Validator.isLength(tournamentData.url, { min: 6, max: 10 })) {
    errors.url =
      'URL must be between 6 and 10 characters (enter random characters/digits).';
  }

  if (Validator.isEmpty(tournamentData.url)) {
    errors.url = 'URL is required (enter random characters/digits).';
  }

  if (!Validator.isISO8601(tournamentData.start_at)) {
    errors.start_at = 'Not a valid date';
  }

  if (Validator.isEmpty(tournamentData.start_at)) {
    errors.start_at = 'Start At field is required.';
  }

  if (
    !moment.tz.names().find(timeZone => timeZone === tournamentData.time_zone)
  ) {
    errors.time_zone = 'Not a valid time zone';
  }

  if (Validator.isEmpty(tournamentData.time_zone)) {
    errors.time_zone = 'Time zone is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateTournament;
