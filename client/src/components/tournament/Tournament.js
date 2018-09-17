import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { getTournament } from '../../actions/tournamentActions';
import { getParticipants } from '../../actions/participantsActions';

import Brackets from './Brackets';
import Participants from './Participants';
import Spinner from '../Spinner';

class Tournament extends Component {
  constructor() {
    super();
    this.state = {
      tab: 'brackets',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getTournament(this.props.match.params.id);
    this.props.getParticipants(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    let mainContent;

    if (this.props.participants.loading) mainContent = <Spinner />;
    else {
      if (errors.participants) {
        mainContent = <div>{errors.participants}</div>;
      } else {
        mainContent =
          this.state.tab === 'brackets' ? (
            <Brackets id={this.props.match.params.id} />
          ) : (
            <Participants />
          );
      }
    }
    if (this.props.tournament.loading) {
      return <Spinner />;
    } else {
      if (errors.tournament) {
        return <div>{errors.tournament}</div>;
      }
      const startTime = moment(this.props.tournament.data.start_at);
      return (
        <div className="container tournament-container mt-2">
          <h3 className="text-primary">{this.props.tournament.data.name}</h3>
          <p>
            {startTime.format('h:mm a MMMM Do YYYY')}
            <br />
            {this.props.tournament.data.description}
          </p>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={classnames('btn nav-link', {
                  active: this.state.tab === 'brackets'
                })}
                onClick={() => this.setState({ tab: 'brackets' })}
              >
                Brackets
              </a>
            </li>
            <li className="nav-item">
              <a
                className={classnames('btn nav-link', {
                  active: this.state.tab === 'participants'
                })}
                onClick={() => this.setState({ tab: 'participants' })}
              >
                Participants
              </a>
            </li>
          </ul>
          {mainContent}
        </div>
      );
    }
  }
}

Tournament.propTypes = {
  getTournament: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  participants: PropTypes.object.isRequired,
  getParticipants: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tournament: state.tournament,
  participants: state.participants,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTournament, getParticipants }
)(Tournament);
