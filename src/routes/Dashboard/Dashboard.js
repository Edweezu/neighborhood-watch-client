import React from 'react'
import { NavLink } from 'react-router-dom'

class Dashboard extends React.Component {
    render () {
        return (
            <section className='Dashboard'>
                <div className='Dashboard__sideBar'>
                    <ul className='Dashboard__list'>
                        <li>
                            <NavLink
                                className='Dashboard__folderLink'
                                to={`/all-posts`}
                            >
                                All Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='Dashboard__folderLink'
                                to={`/crime`}
                            >
                               Crime and Alerts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='Dashboard__folderLink'
                                to={`/events`}
                            >
                                Upcoming Events
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='Dashboard__folderLink'
                                to={`/lost`}
                            >
                                Lost and Found
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
}

export default Dashboard