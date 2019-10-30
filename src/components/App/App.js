import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import LandingPage from '../../routes/LandingPage/LandingPage'
import './App.css'
import CreateAccount from '../../routes/CreateAccount/CreateAccount'
import LoginPage from '../../routes/LoginPage/LoginPage'
import ProfilePage from '../../routes/ProfilePage/ProfilePage'
import Dashboard from '../../routes/Dashboard/Dashboard'
import MemberProfiles from '../../routes/MemberProfiles/MemberProfiles'
import MyProfile from '../../routes/MyProfile/MyProfile'
import categories from '../../data/categories'
import MainContext from '../../contexts/MainContext'
import PostPage from '../../routes/PostPage/PostPage'
import TokenService from '../../services/token-service'
import UsersService from '../../services/users-api-service'
import IdleService from '../../services/idle-service'

class App extends React.Component {

  state = {
    posts : [],
    comments: [],
    users: [],
    places: [],
    categories: [],
    menuOpen: false,
    place_id: 1,
    place: {},
    login: null,
    expired: false,
    country: '',
    state: '',
    city: '',
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle)
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        UsersService.postRefreshToken()
      })
    } 
  }

  setPosts = (posts) => {
    this.setState({
      posts
    })
  }

  setComments = (comments) => {
    this.setState({
      comments
    })
  }

  setPlaces = (places) => {
    this.setState({
      places
    })
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
   
    this.props.history.push('/login')
    this.forceUpdate()
  }

  handleChangeCountry = (e) => {
    this.setState({
        country : e.target.value
    })
  }

  handleChangeState = (e) => {
      this.setState({
          state : e.target.value
      })
  }

  handleChangeCity = (e) => {
      this.setState({
          city : e.target.value
      })
  }

  isLoggedIn = () => {
    this.setState({
      login: true,
      expired: false
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

  showPlaceDetails = (place) => {
    this.setState({
      place
    })
  }

  handleCityChange = (e) => {
    this.setState({
        place_id: e.target.value
    })
  }

  addPost = (post) => {
    document.body.style.overflowY = 'auto'
    this.setState({
      posts: [
        ...this.state.posts,
        post
      ],
    })
  }
 
  addPlace = (place) => {
    this.setState({
      places: [
        ...this.state.places,
        place
      ],
      country: '',
      state: '',
      city: ''
    })
  }

  addComment = (comment) => {
    this.setState({
      comments: [
        ...this.state.comments,
        comment
      ]
    })
  }

  deletePost = (postId) => {
    this.setState({
      posts: this.state.posts.filter(post => {
        return post.id !== postId
      })
    })
  }

  updateComment = (responseJson) => {
    this.setState({
      comments: this.state.comments.map(comment => (comment.id !== responseJson.id) ? comment : responseJson)
    })
  }

  deleteComment = (commentId) => {
    this.setState({
      comments: this.state.comments.filter(comment => {
        return comment.id !== commentId
      })
    })
  }

  updatePost = (responseJson) => {
    this.setState({
      posts: this.state.posts.map(post => {
        if (responseJson.id !== post.id) {
          return post
        } else {
          return responseJson
        }
      })
    })
  }
 
  render () {

    const { place, posts, comments, users, cities, menuOpen,place_id, country, state, city, places } = this.state

    const contextValue = {
      posts,
      users,
      comments,
      cities,
      categories,
      menuOpen,
      place_id,
      handleMenuClick: this.handleMenuClick,
      handleLinkClick: this.handleLinkClick,
      handleCityChange: this.handleCityChange,
      place,
      onPlaceChanged: this.showPlaceDetails,
      loggedIn: this.isLoggedIn,
      addPost: this.addPost,
      country,
      state,
      city,
      handleChangeCity: this.handleChangeCity,
      handleChangeState: this.handleChangeState,
      handleChangeCountry: this.handleChangeCountry,
      addPlace: this.addPlace,
      addComment: this.addComment,
      setPosts: this.setPosts,
      setComments: this.setComments,
      setPlaces: this.setPlaces,
      deletePost: this.deletePost,
      deleteComment: this.deleteComment,
      places,
      updatePost: this.updatePost,
      updateComment: this.updateComment
    }

    return (
      <main className="App">
          <MainContext.Provider value={contextValue}>
            <Switch>
              <Route exact path={'/'} component={LandingPage}/>
              <Route path ={'/register'} component ={CreateAccount}/>
              <Route path ={'/login'} component ={LoginPage}/>
              <Route path ={'/create-profile/:userId'} component ={ProfilePage}/>
              <Route path ={'/category/:categoryId'} component ={Dashboard}/>
              <Route path ={'/mem-profiles'} component ={MemberProfiles}/>
              <Route path ={'/my-profile'} component ={MyProfile}/>
              <Route path ={'/post-page/:postId'} component ={PostPage}/>
            </Switch>
          </MainContext.Provider>
      </main>
    );
  }
}

export default withRouter(App);
