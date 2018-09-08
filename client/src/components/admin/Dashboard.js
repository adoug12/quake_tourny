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

    if (this.props.tournament.loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
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
              <Participants />
              {(tournament.state === 'pending' ||
                tournament.state === 'checking_in') && <SignupForm />}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-primary mr-1"
                onClick={this.processCheckinsOnClick}
                disabled={tournament.state === 'checking_in' ? true : false}
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
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={this.finalizeOnClick}
                disabled={tournament.started_at ? false : true}
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
  getParticipants: PropTypes.func.isRequired,
  processCheckins: PropTypes.func.isRequired,
  startTournament: PropTypes.func.isRequired,
  finalizeTournament: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tournament: state.tournament
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
