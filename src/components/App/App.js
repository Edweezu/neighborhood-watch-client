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
import Crime from '../../routes/Crime/Crime'
import MemberProfiles from '../../routes/MemberProfiles/MemberProfiles'
import MyProfile from '../../routes/MyProfile/MyProfile'
import posts from '../../data/posts'
import comments from '../../data/posts'
import users from '../../data/users'
import cities from '../../data/cities'
import categories from '../../data/categories'
import MainContext from '../../contexts/MainContext'


class App extends React.Component {

  state = {
    posts : [],
    comments: [],
    users: [],
    cities: [],
    categories: [],
    menuOpen: false,
    city_id: 1
  }

  componentDidMount() {
    this.setState({
      posts,
      users,
      comments,
      cities,
      categories
    })
  }

  handleMenuClick = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  handleLinkClick = () => {
    this.setState({
      menuOpen: false
    })
  }

  handleCityChange = (e) => {
    this.setState({
        city_id: e.target.value
    })
}
 

  render () {

    const { posts, comments, users, cities, menuOpen,city_id } = this.state

    // console.log('app post', posts)
    // console.log('app cities', cities)

    const contextValue = {
      posts,
      users,
      comments,
      cities,
      categories,
      menuOpen,
      city_id,
      handleMenuClick: this.handleMenuClick,
      handleLinkClick: this.handleLinkClick,
      handleCityChange: this.handleCityChange
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
            <Route path ={'/category/:categoryId'} component ={Dashboard}/>
            <Route path ={'/mem-profiles'} component ={MemberProfiles}/>
            <Route path ={'/my-profile'} component ={MyProfile}/>
            {/* <Route path={'/crime'} component={Crime}/> */}
          </Switch>
        </MainContext.Provider>
        <Footer />
      </main>
    );
  }
}

export default App;
