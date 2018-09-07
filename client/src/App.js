import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/layout/Header';
import TournamentForm from './components/forms/TournamentForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Route exact path="/" component={TournamentForm} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
