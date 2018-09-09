import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
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
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
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

    const tournamentData = {
      name: this.state.name,
      url: this.state.url,
      description: this.state.description,
      signup_cap: this.state.signup_cap,
      check_in_duration: this.state.check_in_duration,
      start_at: this.state.start_at
    };

    this.props.createTournament(tournamentData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container form-container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <p className="lead text-center">Create your Tournament</p>
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
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.description
                  })}
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.signup_cap
                  })}
                  placeholder="Signup Cap"
                  name="signup_cap"
                  value={this.state.signup_cap}
                  onChange={this.onChange}
                />
                {errors.signup_cap && (
                  <div className="invalid-feedback">{errors.signup_cap}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.check_in_duration
                  })}
                  placeholder="Check In Duration"
                  name="check_in_duration"
                  value={this.state.check_in_duration}
                  onChange={this.onChange}
                />
                {errors.check_in_duration && (
                  <div className="invalid-feedback">
                    {errors.check_in_duration}
                  </div>
                )}
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
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
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
