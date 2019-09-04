import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Nav from '../Nav/Nav'
import LandingPage from '../../routes/LandingPage/LandingPage'
import './App.css'
import Footer from '../Footer/Footer'
import CreateAccount from '../../routes/CreateAccount/CreateAccount'
import LoginPage from '../../routes/LoginPage/LoginPage'
import ProfilePage from '../../routes/ProfilePage/ProfilePage'


class App extends React.Component {

  render () {
    return (
      <main className="App">
        <Nav />
        <Switch>
          <Route exact path={'/'} component={LandingPage}/>
          <Route path ={'/register'} component ={CreateAccount}/>
          <Route path ={'/login'} component ={LoginPage}/>
          <Route path ={'/profile'} component ={ProfilePage}/>
        </Switch>
        <Footer />
      </main>
    );
  }
}

export default App;
