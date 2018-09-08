import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTournament } from '../../actions/tournamentActions';
import { getParticipants } from '../../actions/participantsActions';
import { getRounds } from '../../actions/roundsActions';

import Spinner from '../Spinner';

class Brackets extends Component {
  constructor() {
    super();
    this.getPlayerName = this.getPlayerName.bind(this);
  }
  componentDidMount() {
    this.props.getTournament(this.props.match.params.id);
    this.props.getParticipants(this.props.match.params.id);
    this.props.getRounds(this.props.match.params.id);
  }

  getPlayerName(id) {
    return this.props.participants.data.find(player => player.id === id).name;
  }

  render() {
    const rounds = this.props.rounds.data;

    if (
      this.props.rounds.loading ||
      this.props.participants.loading ||
      this.props.tournament.loading
    ) {
      return <Spinner />;
    } else {
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
  getTournament: PropTypes.func.isRequired,
  getParticipants: PropTypes.func.isRequired,
  getRounds: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
  participants: PropTypes.object.isRequired,
  rounds: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tournament: state.tournament,
  participants: state.participants,
  rounds: state.rounds
});

export default connect(
  mapStateToProps,
  { getTournament, getParticipants, getRounds }
)(Brackets);
