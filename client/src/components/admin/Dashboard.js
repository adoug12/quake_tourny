import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { getParticipants } from '../../actions/participantsActions';
import {
  getTournament,
  processCheckins,
  startTournament,
  finalizeTournament
} from '../../actions/tournamentActions';

import Participants from './Participants';
import Brackets from './Brackets';
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
    this.props.getParticipants(this.props.match.params.id);
  }

  processCheckinsOnClick() {
    this.props.processCheckins(this.props.tournament.data.id);
  }

  startOnClick() {
    this.props.startTournament(this.props.tournament.data.id);
  }

  finalizeOnClick() {
    this.props.finalizeTournament(this.props.tournament.data.id);
  }

  render() {
    const tournament = this.props.tournament.data;
    const startTime = moment(tournament.start_at);
    const checkinTime = moment(tournament.start_at).subtract(
      tournament.check_in_duration,
      'minutes'
    );

    let dashboardContent;
    let controlButtons;

    if (this.props.participants.loading) {
      dashboardContent = <Spinner />;
    } else if (
      tournament.state === 'underway' ||
      tournament.state === 'complete'
    ) {
      dashboardContent = <Brackets id={this.props.match.params.id} />;
      if (tournament.state === 'underway') {
        controlButtons = (
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-danger mr-1"
              onClick={this.finalizeOnClick}
              disabled={tournament.started_at ? false : true}
            >
              Finalize
            </button>
          </div>
        );
      }
    } else {
      dashboardContent = (
        <div>
          <Participants />
          <SignupForm />
        </div>
      );
      controlButtons = (
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={this.processCheckinsOnClick}
            disabled={tournament.state === 'checking_in' ? false : true}
          >
            Process Check-Ins
          </button>
          <button
            type="button"
            className="btn btn-success mr-1"
            onClick={this.startOnClick}
            disabled={tournament.state === 'checked_in' ? false : true}
          >
            Start
          </button>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4>
              {tournament.name} - {tournament.state}
            </h4>
            <p>
              {startTime.format('MMMM Do YYYY')}
              <br />
              Tournament Starts: {startTime.format('h:mm a')}
              <br />
              Checkins Open: {checkinTime.format('h:mm a')}
            </p>
            {dashboardContent}
          </div>
        </div>
        <div className="row" />
        {controlButtons}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getTournament: PropTypes.func.isRequired,
  getParticipants: PropTypes.func.isRequired,
  processCheckins: PropTypes.func.isRequired,
  startTournament: PropTypes.func.isRequired,
  finalizeTournament: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
  participants: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tournament: state.tournament,
  participants: state.participants
});

export default connect(
  mapStateToProps,
  {
    getTournament,
    getParticipants,
    processCheckins,
    startTournament,
    finalizeTournament
  }
)(Dashboard);
