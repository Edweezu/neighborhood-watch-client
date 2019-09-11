import React from 'react'
import { NavLink } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'

class DashNav extends React.Component {


    static contextType = MainContext

    render () {

     return (
            <section className='DashNav'>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/all-posts`}
                        >
                            All Posts
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'> 
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/crime`}
                        >
                            Crime and Alerts
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/events`}
                        >
                            Upcoming Events
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/lost`}
                        >
                            Lost and Found
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/`}
                        >
                            Logout
                        </NavLink>
                    </div>
                </div>
            </section>             
        )
    }
}

export default DashNav