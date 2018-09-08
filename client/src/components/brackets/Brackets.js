import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTournament } from '../../actions/tournamentActions';

import Spinner from '../Spinner';

class Brackets extends Component {
  constructor() {
    super();
    this.getPlayerName = this.getPlayerName.bind(this);
  }
  componentDidMount() {
    this.props.getTournament(this.props.match.params.id);
  }

  getPlayerName(id) {
    return this.props.players.find(player => player.id === id).name;
  }

  render() {
    const roundCount = Math.max.apply(
      Math,
      this.props.matches.map(match => match.round)
    );
    let rounds = [];

    for (let i = 1; i <= roundCount; i++) {
      rounds[i] = this.props.matches.filter(match => match.round === i);
    }

    return (
      <div className="bracket-container">
        {rounds.map((round, index) => (
          <div className="bracket-level" key={index}>
            {round.map(match => {
              let player1_score, player2_score;
              if (match.state === 'complete') {
                [player1_score, player2_score] = match.scores_csv.split('-');
              }
              return (
                <div className="bracket-matchup" key={match.identifier}>
                  <div className="bracket-team">
                    <div className="bracket-name">
                      {match.player1_id && this.getPlayerName(match.player1_id)}
                    </div>
                    <div className="bracket-score">{player1_score}</div>
                  </div>
                  <div className="bracket-team">
                    <div className="bracket-name">
                      {match.player2_id && this.getPlayerName(match.player2_id)}
                    </div>
                    <div className="bracket-score">{player2_score}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

Brackets.propTypes = {
  getTournament: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  info: state.tournament.info,
  matches: state.tournament.matches,
  players: state.tournament.players,
  loading: state.tournament.loading
});

export default connect(
  mapStateToProps,
  { getTournament }
)(Brackets);
