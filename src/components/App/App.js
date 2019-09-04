import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Nav from '../Nav/Nav'
import LandingPage from '../../routes/LandingPage/LandingPage'
import './App.css'

class App extends React.Component {

  render () {
    return (
      <main className="main-content">
        <Nav />
        <Switch>
          <Route exact path={'/'} component={LandingPage}/>
        </Switch>
      </main>
    );
  }
}

export default App;
