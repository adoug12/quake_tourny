import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/layout/Header';
import TournamentForm from './components/forms/TournamentForm';
import Dashboard from './components/admin/Dashboard';
import Brackets from './components/brackets/Brackets';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
              <Header />
              <Route exact path="/" component={TournamentForm} />
              <Route exact path="/tournament/:id/admin" component={Dashboard} />
              <Route exact path="/tournament/:id" component={Brackets} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
