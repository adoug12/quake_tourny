import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkin, checkout, seed } from '../../actions/participantsActions';

import Spinner from '../Spinner';

class Participants extends Component {
  constructor() {
    super();
    this.checkinOnClick = this.checkinOnClick.bind(this);
    this.checkoutOnClick = this.checkoutOnClick.bind(this);
    this.seedUpOnClick = this.seedUpOnClick.bind(this);
    this.seedDownOnClick = this.seedDownOnClick.bind(this);
  }

  checkinOnClick(playerId) {
    this.props.checkin(this.props.tournament.data.id, playerId);
  }

  checkoutOnClick(playerId) {
    this.props.checkout(this.props.tournament.data.id, playerId);
  }

  seedUpOnClick(playerId, seed) {
    if (seed > 1) {
      seed--;
      this.props.seed(this.props.tournament.data.id, playerId, seed);
    }
  }

  seedDownOnClick(playerId, seed) {
    if (seed < this.props.participants.data.length) {
      seed++;
      this.props.seed(this.props.tournament.data.id, playerId, seed);
    }
  }

  render() {
    const participants = this.props.participants.data;

    let participantsContent;

    if (this.props.participants.loading) {
      participantsContent = <Spinner />;
    } else {
      participantsContent = (
        <table className="table table-striped table-borderless">
          <thead>
            <tr>
              <th scope="col">Seed</th>
              <th scope="col">Name</th>
              <th scope="col">Rating</th>
              {this.props.tournament.data.state === 'checking_in' && (
                <th scope="col">Check-In</th>
              )}
            </tr>
          </thead>
          <tbody>
            {participants.map(player => (
              <tr key={player.id}>
                <td>
                  {this.props.tournament.data.state !== 'underway' && (
                    <i
                      className="btn fas fa-angle-up"
                      onClick={() => this.seedUpOnClick(player.id, player.seed)}
                    />
                  )}{' '}
                  {player.seed}{' '}
                  {this.props.tournament.data.state !== 'underway' && (
                    <i
                      className="btn fas fa-angle-down"
                      onClick={() =>
                        this.seedDownOnClick(player.id, player.seed)
                      }
                    />
                  )}
                </td>
                <td>{player.name}</td>
                <td>{player.duelRating}</td>
                {this.props.tournament.data.state === 'checking_in' && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={e => this.checkinOnClick(player.id)}
                      disabled={player.checked_in}
                    >
                      <i className="fas fa-check" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={e => this.checkoutOnClick(player.id)}
                      disabled={!player.checked_in}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <div>{participantsContent}</div>;
  }
}

Participants.propTypes = {
  checkin: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  seed: PropTypes.func.isRequired,
  participants: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tournament: state.tournament,
  participants: state.participants
});

export default connect(
  mapStateToProps,
  {
    checkin,
    checkout,
    seed
  }
)(Participants);
