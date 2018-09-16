import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment-timezone';
import { createTournament } from '../../actions/tournamentActions';

class TournamentForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      url: '',
      description: '',
      signup_cap: '',
      check_in_duration: '',
      start_at: '',
      time_zone: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createTournament(this.state, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const timeZones = moment.tz.names();
    return (
      <div className="container form-container mt-2">
        <h1 className="text-center">Create Your Tournament</h1>
        <div className="col-md-8 m-auto mt-2">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.name
                })}
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.url
                })}
                placeholder="URL"
                name="url"
                value={this.state.url}
                onChange={this.onChange}
              />
              {errors.url && (
                <div className="invalid-feedback">{errors.url}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Signup Cap"
                name="signup_cap"
                value={this.state.signup_cap}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Check In Duration (minutes)"
                name="check_in_duration"
                value={this.state.check_in_duration}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startAt">Start At</label>
              <input
                type="datetime-local"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.start_at
                })}
                name="start_at"
                value={this.state.start_at}
                onChange={this.onChange}
              />
              {errors.start_at && (
                <div className="invalid-feedback">{errors.start_at}</div>
              )}
            </div>
            <div className="form-group">
              <select
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.time_zone
                })}
                name="time_zone"
                onChange={this.onChange}
                value={this.state.time_zone}
              >
                <option value="" disabled>
                  Select time zone
                </option>
                {timeZones.map((zone, index) => (
                  <option value={zone} key={index}>
                    {zone}
                  </option>
                ))}
              </select>
              {errors.time_zone && (
                <div className="invalid-feedback">{errors.time_zone}</div>
              )}
            </div>
            <input type="submit" className="btn btn-primary btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

TournamentForm.propTypes = {
  createTournament: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createTournament }
)(withRouter(TournamentForm));
