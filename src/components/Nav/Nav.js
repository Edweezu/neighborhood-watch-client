import React from 'react'
// import { Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'

class Nav extends React.Component {

  static contextType = MainContext

    handleLogoutClick = () => {
      // this.context.loggedOut()
      TokenService.clearAuthToken()
      TokenService.clearCallbackBeforeExpiry()
      IdleService.unRegisterIdleResets()
    } 



    render () {
        return (
          <header className='Nav__header'>
          <a href="#main-menu"
             id="main-menu-toggle"
             className="menu-toggle"
          >
            <span className="fa fa-bars" aria-hidden="true"></span>
          </a>         
          <h3 className='logo'>
              <NavLink to ='/'><i className="fas fa-home"></i>
                  Neighborhood Watch
              </NavLink>
          </h3>
          
          <nav id="main-menu" className="main-menu" aria-label="Main menu">
            <a href="#main-menu-toggle"
               id="main-menu-close"
               className="menu-close"
            >
              <span className="fas fa-times" aria-hidden="true"></span>
            </a>
            <ul className='main__ul'>
              <li> 
                {/* <NavLink
                  to='/register'>
                  Create an Account
                </NavLink> */}
                <a href='/register#main-menu-toggle'>Create an Account</a>
              </li>
              <li>
                {/* <NavLink
                  to={{
                    pathname: '/login',
                    hash: '#main-menu-toggle'
                  }}>
                  Login
                 </NavLink> */}
                 <a href='/login#main-menu-toggle'>Login</a>
              </li>
              <li>
                {/* <NavLink
                  to='/mem-profiles'>
                  Member Profiles
                </NavLink> */}
                <a href='/mem-profiles#main-menu-toggle'>Member Profiles</a>
              </li>
              <li>
                {/* <NavLink
                  to='/my-profile'>
                  My Profile
                </NavLink> */}
                <a href='/my-profile#main-menu-toggle'>My Profile</a>
              </li>
              <li>
                {/* <NavLink
                  to='/'>
                  Logout
                </NavLink> */}
                <a href='/#main-menu-toggle'>Logout</a>
              </li>
            </ul>
            <ul className='second__ul'>
              <li>
                {/* <NavLink
                    to={`/category/1`}
                >
                    All Posts
                </NavLink> */}
                <a href='/category/1#main-menu-toggle'>All Posts</a>
              </li>
              <li>
                {/* <NavLink
                    to={`/category/Crime and Alerts`}
                >
                    Crime and Alerts
                </NavLink> */}
                <a href='/category/Crime and Alerts#main-menu-toggle'>Crime and Alerts</a>
              </li>
              <li>
                {/* <NavLink
                    to={`/category/Upcoming Events`}
                >
                    Upcoming Events
                </NavLink> */}
                <a href='/category/Upcoming Events#main-menu-toggle'>Upcoming Events</a>
              </li>
              <li>
                {/* <NavLink
                    to={`/category/Lost and Found`}
                >
                    Lost and Found
                </NavLink> */}
                <a href='/category/Lost and Found#main-menu-toggle'>Lost and Found</a>
              </li>
            </ul>
            <div className='Nav__footer'>
              <Footer />
            </div>
          </nav>
          <a href="#main-menu-toggle"
             className="backdrop"
             tabIndex="-1"
             aria-hidden="true" hidden></a>
        </header> 
        )
    }
}

export default Nav