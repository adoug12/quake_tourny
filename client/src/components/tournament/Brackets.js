import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRounds } from '../../actions/roundsActions';
import Modal from 'react-modal';
import axios from 'axios';

import Spinner from '../Spinner';
import RatingGauge from './RatingGauge';
import WinLossChart from './WinLossChart';

Modal.setAppElement('#root');

class Brackets extends Component {
  constructor() {
    super();
    this.state = { showModal: false, match: {}, player1: {}, player2: {} };
    this.getPlayer = this.getPlayer.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    this.props.getRounds(this.props.id);
  }

  getPlayer(id) {
    return this.props.participants.data.find(player => player.id === id);
  }

  handleOpenModal(matchId) {
    axios
      .get(`/api/tournament/${this.props.id}/matches/${matchId}`)
      .then(res =>
        this.setState({
          showModal: true,
          match: res.data,
          player1: this.getPlayer(res.data.player1_id),
          player2: this.getPlayer(res.data.player2_id)
        })
      )
      .catch(err => console.log(err.response.data));
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    if (this.props.rounds.loading) {
      return <Spinner />;
    } else {
      const rounds = this.props.rounds.data;

      return (
        <div className="container border-left border-right border-bottom">
          <div className="row">
            <div
              className="bracket-container"
              style={{ height: rounds[0] ? rounds[0].length * 80 : '100%' }}
            >
              {rounds.map((round, index) => (
                <div className="bracket-level" key={index}>
                  {round.map(match => {
                    let player1_score, player2_score;
                    if (match.state === 'complete') {
                      [player1_score, player2_score] = match.scores_csv.split(
                        '-'
                      );
                    }
                    return (
                      <div
                        className="bracket-matchup"
                        key={match.identifier}
                        onClick={() => this.handleOpenModal(match.id)}
                      >
                        <div className="bracket-team">
                          <div className="bracket-name">
                            {match.player1_id &&
                              this.getPlayer(match.player1_id).name}
                          </div>
                          <div className="bracket-score">{player1_score}</div>
                        </div>
                        <div className="bracket-team">
                          <div className="bracket-name">
                            {match.player2_id &&
                              this.getPlayer(match.player2_id).name}
                          </div>
                          <div className="bracket-score">{player2_score}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {this.state.showModal && (
            <Modal
              isOpen={this.state.showModal}
              contentLabel="onRequestClose Example"
              onRequestClose={this.handleCloseModal}
              shouldCloseOnOverlayClick={true}
            >
              <div className="row">
                <div className="col text-right">
                  <h3 className="text-primary">{this.state.player1.name}</h3>
                  {this.state.player1.favoriteChampions.map(
                    (champion, index) => (
                      <img
                        key={index}
                        className="img-thumbnail"
                        src={`/images/${champion.name}.png`}
                        alt={champion.name}
                        style={{ width: '80px', height: '80px' }}
                      />
                    )
                  )}
                </div>
                <div className="col-sm-1">
                  <RatingGauge player={this.state.player1} />
                </div>
                <div className="col-sm-1">
                  <RatingGauge player={this.state.player2} />
                </div>
                <div className="col">
                  <h3 className="text-danger">{this.state.player2.name}</h3>
                  {this.state.player2.favoriteChampions.map(
                    (champion, index) => (
                      <img
                        key={index}
                        className="img-thumbnail"
                        src={`/images/${champion.name}.png`}
                        alt={champion.name}
                        style={{ width: '80px', height: '80px' }}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="row">
                <WinLossChart player1={this.state.player1} player2={this.state.player2} />
              </div>
            </Modal>
          )}
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
