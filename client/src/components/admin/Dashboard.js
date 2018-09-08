import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  getTournament,
  processCheckins,
  startTournament,
  finalizeTournament
} from '../../actions/tournamentActions';

import Participants from './Participants';
import SignupForm from './SignupForm';
import Spinner from '../Spinner';

class Dashboard extends Component {
  constructor() {
    super();
    this.processCheckinsOnClick = this.processCheckinsOnClick.bind(this);
    this.startOnClick = this.startOnClick.bind(this);
    this.finalizeOnClick = this.finalizeOnClick.bind(this);
  }

  componentDidMount() {
    this.props.getTournament(this.props.match.params.id);
  }

  processCheckinsOnClick() {
    this.props.processCheckins(this.props.info.id);
  }

  startOnClick() {
    this.props.startTournament(this.props.info.id);
  }

  finalizeOnClick() {
    this.props.finalizeTournament(this.props.info.id);
  }

  render() {
    const startTime = moment(this.props.info.start_at);
    const checkinTime = moment(this.props.info.start_at).subtract(
      this.props.info.check_in_duration,
      'minutes'
    );

    let dashboardContent;

    if (this.props.loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <div className="row">
            <div className="col-md-12">
              <h4>
                {this.props.info.name} - {this.props.info.state}
              </h4>
              <p>
                {startTime.format('MMMM Do YYYY')}
                <br />
                Tournament Starts: {startTime.format('h:mm a')}
                <br />
                Checkins Open: {checkinTime.format('h:mm a')}
              </p>
              <Participants />
              {(this.props.info.state === 'pending' ||
                this.props.info.state === 'checking_in') && <SignupForm />}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-primary mr-1"
                onClick={this.processCheckinsOnClick}
                disabled={
                  this.props.info.state === 'checking_in' ? true : false
                }
              >
                Process Check-Ins
              </button>
              <button
                type="button"
                className="btn btn-success mr-1"
                onClick={this.startOnClick}
                disabled={this.props.info.state === 'checked_in' ? false : true}
              >
                Start
              </button>
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={this.finalizeOnClick}
                disabled={this.props.info.started_at ? false : true}
              >
                Finalize
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <div className="container">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getTournament: PropTypes.func.isRequired,
  processCheckins: PropTypes.func.isRequired,
  startTournament: PropTypes.func.isRequired,
  finalizeTournament: PropTypes.func.isRequired,
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
  {
    getTournament,
    processCheckins,
    startTournament,
    finalizeTournament
  }
)(Dashboard);
