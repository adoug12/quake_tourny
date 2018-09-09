import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRounds } from '../../actions/roundsActions';

import Spinner from '../Spinner';

class Brackets extends Component {
  constructor() {
    super();
    this.getPlayerName = this.getPlayerName.bind(this);
  }

  componentDidMount() {
    this.props.getRounds(this.props.id);
  }

  getPlayerName(id) {
    return this.props.participants.data.find(player => player.id === id).name;
  }

  render() {
    if (this.props.rounds.loading) {
      return <Spinner />;
    } else {
      const rounds = this.props.rounds.data;

      return (
        <div className="bracket-container border-left border-right border-bottom">
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
                        {match.player1_id &&
                          this.getPlayerName(match.player1_id)}
                      </div>
                      <div className="bracket-score">{player1_score}</div>
                    </div>
                    <div className="bracket-team">
                      <div className="bracket-name">
                        {match.player2_id &&
                          this.getPlayerName(match.player2_id)}
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
}

Brackets.propTypes = {
  participants: PropTypes.object.isRequired,
  rounds: PropTypes.object.isRequired,
  getRounds: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  participants: state.participants,
  rounds: state.rounds
});

export default connect(
  mapStateToProps,
  { getRounds }
)(Brackets);
