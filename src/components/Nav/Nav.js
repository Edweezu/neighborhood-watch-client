import React from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {

  static contextType = MainContext




    render () {

        return (
          <header class='Nav__header'>
          <a href="#main-menu"
             id="main-menu-toggle"
             className="menu-toggle"
          >
            <span className="fa fa-bars" aria-hidden="true"></span>
          </a>
          
          <h3 className='logo'>
              <Link to ='/'><i className="fas fa-home"></i>
                  Neighborhood Watch
              </Link>
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
                <Link
                  to='/register'>
                  Create an Account
                </Link>
              </li>
              <li>
                <Link
                  to='/login'>
                  Login
                 </Link>
              </li>
              <li>
                <Link
                  to='/mem-profiles'>
                  Member Profiles
                </Link>
              </li>
              <li>
                <Link
                  to='/my-profile'>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to='/'>
                  Logout
                </Link>
              </li>
            </ul>
            <ul className='second__ul'>
              <li>
                <Link
                  to='/all-posts'>
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to='/crime'>
                  Crime and Alerts
                </Link>
              </li>
              <li>
                <Link
                  to='/events'>
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to='/lost'>
                  Lost and Found
                </Link>
              </li>
            </ul>
          </nav>
          <a href="#main-menu-toggle"
             className="backdrop"
             tabindex="-1"
             aria-hidden="true" hidden></a>
        </header> 
        )
    }
}

export default Nav