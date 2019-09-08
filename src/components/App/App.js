import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Nav from '../Nav/Nav'
import LandingPage from '../../routes/LandingPage/LandingPage'
import './App.css'
import Footer from '../Footer/Footer'
import CreateAccount from '../../routes/CreateAccount/CreateAccount'
import LoginPage from '../../routes/LoginPage/LoginPage'
import ProfilePage from '../../routes/ProfilePage/ProfilePage'
import Dashboard from '../../routes/Dashboard/Dashboard'
import MemberProfiles from '../../routes/MemberProfiles/MemberProfiles'
import MyProfile from '../../routes/MyProfile/MyProfile'
import store from '../../store'
import MainContext from '../../contexts/MainContext'

class App extends React.Component {

  state = {
    store : []
  }

  componentDidMount() {
    this.setState({
      store
    })
  }

  render () {

    const { store } = this.state

    const contextValue = {
      store
    }

    return (
      <main className="App">
        <MainContext.Provider value={contextValue}>
          <Nav />
          <Switch>
            <Route exact path={'/'} component={LandingPage}/>
            <Route path ={'/register'} component ={CreateAccount}/>
            <Route path ={'/login'} component ={LoginPage}/>
            <Route path ={'/create-profile'} component ={ProfilePage}/>
            <Route path ={'/dashboard'} component ={Dashboard}/>
            <Route path ={'/mem-profiles'} component ={MemberProfiles}/>
            <Route path ={'/my-profile'} component ={MyProfile}/>
          </Switch>
        </MainContext.Provider>
        <Footer />
      </main>
    );
  }
}

export default App;
