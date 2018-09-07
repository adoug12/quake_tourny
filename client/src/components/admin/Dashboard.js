import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTournament } from '../../actions/tournamentActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTournament(this.props.match.params.id);
  }

  render() {
    const { loading } = this.props;

    let dashboardContent;

    if (loading) {
      dashboardContent = <h4>Loading...</h4>;
    } else {
      dashboardContent = <h1>Hello</h1>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Admin Control</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getTournament: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  tournament: state.tournament.info,
  matches: state.tournament.matches,
  players: state.tournament.players
});

export default connect(
  mapStateToProps,
  { getTournament }
)(Dashboard);
