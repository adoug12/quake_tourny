import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { signUp } from '../../actions/tournamentActions';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      predictions: []
    };
    this.signUpOnChange = this.signUpOnChange.bind(this);
    this.signUpOnClick = this.signUpOnClick.bind(this);
  }

  signUpOnChange(e) {
    const name = e.target.value;
    this.setState({ name });

    if (name.length > 0) {
      this.searchPlayer(name).then(predictions =>
        this.setState({ predictions })
      );
    } else {
      this.setState({
        predictions: []
      });
    }
  }

  searchPlayer(name) {
    return axios
      .get(`/api/stats/search/${name}`)
      .then(res => res.data.map(player => player.entityName))
      .catch(err => console.log(err.response.data));
  }

  signUpOnClick() {
    this.searchPlayer(this.state.name).then(players => {
      if (players.find(name => name === this.state.name)) {
        this.props.signUp(this.props.info.id, this.state.name);
        this.setState({
          name: ''
        });
      } else {
        console.log(`${this.state.name} not found`);
      }
    });
  }

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.signUpOnClick}
          >
            Sign Up
          </button>
        </div>
        <input
          list="playerNames"
          className="form-control"
          placeholder="Player name..."
          name="name"
          autoComplete="off"
          value={this.state.name}
          onChange={this.signUpOnChange}
        />
        <datalist id="playerNames">
          {this.state.predictions.map((item, index) => (
            <option key={index + item} value={item} />
          ))}
        </datalist>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signUp: PropTypes.func.isRequired,
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
    signUp
  }
)(SignupForm);
