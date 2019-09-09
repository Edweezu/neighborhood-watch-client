import React from 'react'
import { NavLink } from 'react-router-dom'

class DashNav extends React.Component {
    render () {
        return (
            // <section className='DashNav'>
                <ul className='DashNav__list'>
                    <li>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/all-posts`}
                        >
                            All Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/crime`}
                        >
                        Crime and Alerts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/events`}
                        >
                            Upcoming Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='DashNav__folderLink'
                            to={`/lost`}
                        >
                            Lost and Found
                        </NavLink>
                    </li>
                </ul>
            // </section>
        )
    }
}

export default DashNav