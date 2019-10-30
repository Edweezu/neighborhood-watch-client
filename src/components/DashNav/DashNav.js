import React from 'react'
import { NavLink } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
import Footer from '../Footer/Footer'

class DashNav extends React.Component {

    static contextType = MainContext

    render () {
     return (
            <section className='DashNav'>
                 <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/1`}
                        >
                            All Posts
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'> 
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/Crime and Alerts`}
                        >
                            Crime and Alerts
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/Upcoming Events`}
                        >
                            Upcoming Events
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/Lost and Found`}
                        >
                            Lost and Found
                        </NavLink>
                    </div>
                </div>
                <div className='Nav__logout'>
                    <div className='main-nav-link '>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/`}
                        >
                            Logout
                        </NavLink>
                    </div>
                </div> 
                <Footer nav={'nav'}/>   
            </section>
                      
        )
    }
}

export default DashNav