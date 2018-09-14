import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import TournamentForm from './components/forms/TournamentForm';
import Dashboard from './components/admin/Dashboard';
import Tournament from './components/tournament/Tournament';
import Player from './components/player/Player';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={TournamentForm} />
            <Route exact path="/tournament/:id/admin" component={Dashboard} />
            <Route exact path="/tournament/:id" component={Tournament} />
            <Route
              exact
              path="/tournament/:id/player/:playerId"
              component={Player}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
