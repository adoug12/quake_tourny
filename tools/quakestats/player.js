const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;

const player = alias => {
  const endpoint = `${apiEndpoint}/Player/Stats`;
  const query = `?name=${alias}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res => ({
      duelRating: res.data.playerRatings.duel.rating,
      level: res.data.playerLevelState.level,
      duelStats: getDuelStatistics(res.data.playerProfileStats.champions),
      favoriteChampions: getFavoriteChampions(
        res.data.playerProfileStats.champions
      ),
      weaponStats: getWeaponStats(res.data.playerProfileStats.champions)
    }))
    .catch(err => err);
};

const getFavoriteChampions = champStats => {
  let favorites = [];
  for (champion in champStats) {
    favorites.push({
      name: champion,
      timePlayed: champStats[champion].gameModes.GameModeDuel.timePlayed
    });
  }
  return favorites.sort((a, b) => b.timePlayed - a.timePlayed).splice(0, 3);
};

const getWeaponStats = champStats => {
  let weaponStats = {
    GAUNTLET: { hits: 0, shots: 0, kills: 0, damage: 0 },
    MACHINEGUN: { hits: 0, shots: 0, kills: 0, damage: 0 },
    MACHINEGUN_GRADE1: { hits: 0, shots: 0, kills: 0, damage: 0 },
    SHOTGUN: { hits: 0, shots: 0, kills: 0, damage: 0 },
    SHOTGUN_GRADE1: { hits: 0, shots: 0, kills: 0, damage: 0 },
    NAILGUN: { hits: 0, shots: 0, kills: 0, damage: 0 },
    NAILGUN_GRADE1: { hits: 0, shots: 0, kills: 0, damage: 0 },
    ROCKET_LAUNCHER: { hits: 0, shots: 0, kills: 0, damage: 0 },
    LIGHTNING_GUN: { hits: 0, shots: 0, kills: 0, damage: 0 },
    RAILGUN: { hits: 0, shots: 0, kills: 0, damage: 0 },
    LAGBOLT: { hits: 0, shots: 0, kills: 0, damage: 0 }
  };

  for (champion in champStats) {
    const weapons = champStats[champion].damageStatusList;
    for (weapon in weapons) {
      if (weaponStats.hasOwnProperty(weapon)) {
        weaponStats[weapon].hits += weapons[weapon].hits;
        weaponStats[weapon].shots += weapons[weapon].shots;
        weaponStats[weapon].kills += weapons[weapon].kills;
        weaponStats[weapon].damage += weapons[weapon].damage;
      }
    }
  }
  return weaponStats;
};

const getDuelStatistics = champStats => {
  let duelStats = {
    won: null,
    lost: null
  };
  for (champion in champStats) {
    const duels = champStats[champion].gameModes.GameModeDuel;
    duelStats.won += duels.won;
    duelStats.lost += duels.lost;
  }
  return duelStats;
};

module.exports = player;
