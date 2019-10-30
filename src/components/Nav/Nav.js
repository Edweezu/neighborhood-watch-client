import React from 'react'
import MainContext from '../../contexts/MainContext'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'

class Nav extends React.Component {

  static contextType = MainContext

    handleLogoutClick = () => {
      TokenService.clearAuthToken()
      TokenService.clearCallbackBeforeExpiry()
      IdleService.unRegisterIdleResets()
    }

    renderLogoutLink () {
      const { reg } = this.props
      return (
        <header className={`${!reg ? 'Nav__header' : 'Nav__headerReg'}`}>
        <a href="#main-menu"
           id="main-menu-toggle"
           className="menu-toggle"
        >
          <span className="fa fa-bars" aria-hidden="true"></span>
        </a>         
        <h3 className='logo'>
            <NavLink to ='/category/1'><i className="fas fa-home"></i>
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
              <a href='/mem-profiles#main-menu-toggle'><i className="fas fa-users"></i>Member Profiles</a>
            </li>
            <li>
              <a href='/my-profile#main-menu-toggle'><i className="fas fa-user"></i>My Profile</a>
            </li>
            <li>
              <a href='/#main-menu-toggle' onClick={this.handleLogoutClick}><i className="fas fa-sign-out-alt"></i>Logout</a>
            </li>
          </ul>
          <ul className='second__ul'>
            <li>
              <a href='/category/1#main-menu-toggle'><i className="fas fa-newspaper"></i>All Posts</a>
            </li>
            <li>
              <a href='/category/Crime and Alerts#main-menu-toggle'><i className="fas fa-exclamation-triangle"></i>Crime and Alerts</a>
            </li>
            <li>
              <a href='/category/Upcoming Events#main-menu-toggle'><i className="fas fa-calendar-alt"></i>Upcoming Events</a>
            </li>
            <li>
              <a href='/category/Lost and Found#main-menu-toggle'><i className="fas fa-box-open"></i>Lost and Found</a>
            </li>
          </ul>
          <div className='Nav__footer'>
            <Footer  nav={'nav'}/>
          </div>
        </nav>
        <a href="#main-menu-toggle"
           className="backdrop"
           tabIndex="-1"
           aria-hidden="true" hidden></a>
      </header> 
      )
    }

    renderLoginLink () {
      return (
        <header className='Nav__headerReg'>
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
                <a href='/register#main-menu-toggle'><i className="fas fa-user-plus"></i>Sign Up</a>
            </li>
            <li>
              <a href='/login#main-menu-toggle'><i className="fas fa-sign-in-alt"></i>Login</a>
            </li>
          </ul>
          <div className='Nav__footer'>
            <Footer nav={'nav'}/>
          </div>
        </nav>
        <a href="#main-menu-toggle"
           className="backdrop"
           tabIndex="-1"
           aria-hidden="true" hidden></a>
      </header> 
      )
    }

    render () {
        return (
          <section className='NavSection'>
            {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
          </section>
        )
    }
}

export default Nav