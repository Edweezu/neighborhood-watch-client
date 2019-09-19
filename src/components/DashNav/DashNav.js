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
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'> 
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/2`}
                        >
                            Crime and Alerts
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/3`}
                        >
                            Upcoming Events
                        </NavLink>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='main-nav-link'>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/category/4`}
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
                <Footer />   
            </section>
                      
        )
    }
}

export default DashNav