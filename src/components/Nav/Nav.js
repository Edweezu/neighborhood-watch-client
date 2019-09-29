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

      const { categories } = this.context 

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
                <NavLink
                  to='/register'>
                  Create an Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/login'>
                  Login
                 </NavLink>
              </li>
              <li>
                <NavLink
                  to='/mem-profiles'>
                  Member Profiles
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/my-profile'>
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/'>
                  Logout
                </NavLink>
              </li>
            </ul>
            <ul className='second__ul'>
              {categories.map(category => (
                <li key={category.id}>
                  <NavLink to={`/category/${category.id}`}>
                    {category.name}
                  </NavLink>
                  {/* <a href={`/category/${category.id}`}>{category.name}</a> */}
                </li>
              ))}
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