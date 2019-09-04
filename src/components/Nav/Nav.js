import React from 'react'
import { Link } from 'react-router-dom'

class Nav extends React.Component {
    render () {
        return (
            <nav id="navbar" className='nav'>
              <div className='Header-not-in'>
                <h3>
                  <Link to ='/'><i className="fas fa-home"></i>
                      Neighborhood Watch
                  </Link>
                </h3>
                <div className='Header-links'>
                  <Link
                    to='/register'>
                    Create an Account
                  </Link>
                  <span className='Header-space'>  
                  </span>
                  <Link
                    to='/login'>
                    Login
                  </Link>
                </div>   
              </div>  
            </nav>
        )
    }
}

export default Nav