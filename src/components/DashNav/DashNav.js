import React from 'react'
import { NavLink } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
import Footer from '../Footer/Footer'

class DashNav extends React.Component {


    static contextType = MainContext

    render () {

        // const { categories } = this.context

     return (
            <section className='DashNav'>
                {/* <div className='menu-container'>
                    <div className='main-nav-link'>
                        {categories.map(category => (
                            <NavLink className='DashNav__folderLink' to={`/category/${category.id}`}>
                                {category.name}
                            </NavLink>
                        ))}
                    </div>
                </div> */}
                 <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/1`}
                        >
                            All Posts
                        </NavLink>
                        {/* <a className='DashNav__folderLink' href={`/category/1`}>All Posts</a> */}
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
                        {/* <a className='DashNav__folderLink' href={`/category/2`}>Crime and Alerts</a> */}
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
                        {/* <a className='DashNav__folderLink' href={`/category/3`}>Upcoming Events</a> */}
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
                        {/* <a className='DashNav__folderLink' href={`/category/4`}>Lost and Found</a> */}
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