import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Spinner from '../Spinner';
import RatingGauge from './RatingGauge';
import KillPie from './KillPie';
import DamagePie from './DamagePie';
import AccuracyChart from './AccuracyChart';

class Participants extends Component {
  constructor() {
    super();
    this.state = {
      selectedPlayer: {}
    };
    this.playerOnClick = this.playerOnClick.bind(this);
  }

  componentWillMount() {
    this.setState({ selectedPlayer: this.props.participants.data[0] });
  }

  playerOnClick(playerName) {
    this.setState({
      selectedPlayer: this.props.participants.data.find(
        player => player.name === playerName
      )
    });
  }
  render() {
    const colors = [
      '#EED859',
      '#EED859',
      '#FFAD43',
      '#FFAD43',
      '#4078D5',
      '#4078D5',
      '#AD2F22',
      '#2BA9A5',
      '#1BB31E',
      '#86952D'
    ];

    if (this.props.participants.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="container border-left border-right border-bottom">
          <div className="row">
            <div className="col-md-3 p-4">
              <ul className="list-group">
                {this.props.participants.data.map((player, index) => (
                  <li
                    key={index}
                    className={classnames('btn list-group-item', {
                      active: player.name === this.state.selectedPlayer.name
                    })}
                    onClick={() => this.playerOnClick(player.name)}
                  >
                    {player.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col p-4">
              <div className="row">
                <div className="col text-right">
                  <h3>{this.state.selectedPlayer.name}</h3>
                  <p>
                    Level: {this.state.selectedPlayer.level}
                    <br />
                    Wins: {this.state.selectedPlayer.duelStats.won}
                    <br />
                    Losses: {this.state.selectedPlayer.duelStats.lost}
                  </p>
                </div>
                <div className="col">
                  <RatingGauge player={this.state.selectedPlayer} />
                </div>
              </div>
              <div className="row justify-content-center">
                {this.state.selectedPlayer.favoriteChampions.map(
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
              <div className="row justify-content-center">
                <KillPie
                  weaponStats={this.state.selectedPlayer.weaponStats}
                  colors={colors}
                />
                <DamagePie
                  weaponStats={this.state.selectedPlayer.weaponStats}
                  colors={colors}
                />
              </div>
              <div className="row">
                <AccuracyChart
                  weaponStats={this.state.selectedPlayer.weaponStats}
                  colors={colors}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Participants.propTypes = {
  participants: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  participants: state.participants
});

export default connect(
  mapStateToProps,
  null
)(Participants);
