import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { checkin, checkout, seed } from '../../actions/tournamentActions';

class Participants extends Component {
  constructor() {
    super();
    this.checkinOnClick = this.checkinOnClick.bind(this);
    this.checkoutOnClick = this.checkoutOnClick.bind(this);
    this.seedUpOnClick = this.seedUpOnClick.bind(this);
    this.seedDownOnClick = this.seedDownOnClick.bind(this);
  }

  checkinOnClick(playerId) {
    this.props.checkin(this.props.info.id, playerId);
  }

  checkoutOnClick(playerId) {
    this.props.checkout(this.props.info.id, playerId);
  }

  seedUpOnClick(playerId, seed) {
    if (seed > 1) {
      seed--;
      this.props.seed(this.props.info.id, playerId, seed);
    }
  }

  seedDownOnClick(playerId, seed) {
    if (seed < this.props.players.length) {
      seed++;
      this.props.seed(this.props.info.id, playerId, seed);
    }
  }

  render() {
    const checkinTime = moment(this.props.info.start_at).subtract(
      this.props.info.check_in_duration,
      'minutes'
    );
    return (
      <table className="table table-striped table-borderless">
        <thead>
          <tr>
            <th scope="col">Seed</th>
            <th scope="col">Name</th>
            <th scope="col">Rating</th>
            {moment().isAfter(checkinTime) && <th scope="col">Check-In</th>}
          </tr>
        </thead>
        <tbody>
          {this.props.players.map(player => (
            <tr key={player.id}>
              <td>
                <i
                  className="btn fas fa-angle-up"
                  onClick={() => this.seedUpOnClick(player.id, player.seed)}
                />{' '}
                {player.seed}{' '}
                <i
                  className="btn fas fa-angle-down"
                  onClick={() => this.seedDownOnClick(player.id, player.seed)}
                />
              </td>
              <td>{player.name}</td>
              <td>{player.stats.duelRating}</td>
              {moment().isAfter(checkinTime) && (
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
}

Participants.propTypes = {
  checkin: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  seed: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  info: state.tournament.info,
  matches: state.tournament.matches,
  players: state.tournament.players
});

export default connect(
  mapStateToProps,
  {
    checkin,
    checkout,
    seed
  }
)(Participants);
