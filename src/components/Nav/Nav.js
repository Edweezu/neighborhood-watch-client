import React from 'react'
import { Link } from 'react-router-dom'

class Nav extends React.Component {
    render () {
        return (
            <nav id="navbar" className='Nav'>
              <div className='Nav__HeaderNotIn'>
                <h3>
                  <Link to ='/'><i className="fas fa-home"></i>
                      Neighborhood Watch
                  </Link>
                </h3>
                <div className='Nav__HeaderLinks'>
                  <Link
                    to='/register'>
                    Create an Account
                  </Link>
                  <span className='Nav__HeaderSpace'>  
                  </span>
                  <Link
                    to='/login'>
                    Login
                  </Link>
                  <span className='Nav__HeaderSpace'>  
                  </span>
                  <Link
                    to='/mem-profiles'>
                    Member Profiles
                  </Link>
                  <span className='Nav__HeaderSpace'>  
                  </span>
                  <Link
                    to='/my-profile'>
                    My Profile
                  </Link>
                </div>   
              </div>  
            </nav>
        )
    }
}

export default Nav