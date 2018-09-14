import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParticipant } from '../../actions/participantsActions';

import Spinner from '../Spinner';

class Player extends Component {
  componentWillMount() {
    this.props.getParticipant(
      this.props.match.params.id,
      this.props.match.params.playerId
    );
  }
  render() {
    let mainContent;
    if (this.props.participants.loading) mainContent = <Spinner />;
    else {
      mainContent = <div>'Hello'</div>;
    }
    return mainContent;
  }
}

Player.propTypes = {
  participants: PropTypes.object.isRequired,
  getParticipant: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  participants: state.participants
});

export default connect(
  mapStateToProps,
  { getParticipant }
)(Player);
