import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { signUp } from '../../actions/participantsActions';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      predictions: [],
      errors: {}
    };
    this.signUpOnChange = this.signUpOnChange.bind(this);
    this.signUpOnClick = this.signUpOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.signUp(this.props.tournament.data.id, this.state.name);
    this.setState({
      name: '',
      errors: {}
    });
  }

  render() {
    const { errors } = this.state;
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
          className={classnames('form-control', {
            'is-invalid': errors.name
          })}
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
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
    );
  }
}

SignupForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tournament: state.tournament,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    signUp
  }
)(SignupForm);
