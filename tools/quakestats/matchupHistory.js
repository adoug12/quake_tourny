const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;

const matchupHistory = (alias1, alias2) => {
  // Get game history of first player as array
  return games(alias1)
    .then((
      data // Request full data on all games, replacing the summary data in the array
    ) =>
      Promise.all(
        data.map(match =>
          game(match.id)
            .then(data => data)
            .catch(err => err)
        )
        // results is the array of matches. Each match has a battleReportPersonalStatistics array containing player objects
        // The results array is filtered based on the presence of the second player in the battleReportPersonalStatistics array
      ).then(results =>
        results
          .filter(
            result =>
              result.battleReportPersonalStatistics.filter(
                player => player.nickname === alias2
              ).length > 0
          )
          // relevant data for each match between the two players is then extracted
          .map(match => {
            const player1 = match.battleReportPersonalStatistics[0];
            const player2 = match.battleReportPersonalStatistics[1];
            const player1_score = player1.duelScore;
            const player2_score = player2.duelScore;
            return {
              player1: player1.nickname,
              player2: player2.nickname,
              player1_score,
              player2_score
            };
          })
      )
    )
    .catch(err => err);
};

const games = alias => {
  const endpoint = `${apiEndpoint}/Player/GamesSummary`;
  const query = `?name=${alias}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res =>
      res.data.matches.filter(match => match.gameMode === 'GameModeDuel')
    )
    .catch(err => err);
};

const game = id => {
  const endpoint = `${apiEndpoint}/Player/Games`;
  const query = `?id=${id}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err);
};

module.exports = matchupHistory;
