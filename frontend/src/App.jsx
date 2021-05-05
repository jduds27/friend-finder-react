import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage';

function App() {
  return (
    <Router>
        <div className='page-body'>
          <Switch>
            <Route path='/' component={HomePage} exact />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
