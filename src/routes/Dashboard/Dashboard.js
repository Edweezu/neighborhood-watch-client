import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../components/App/App.css'
import DashNav from '../../components/DashNav/DashNav'
import cities from '../../data/cities'
import AddPost from '../../components/AddPost/AddPost'

class Dashboard extends React.Component {
    render () {
        return (
            <section className='Dashboard'>
                <section>
                    <label htmlFor='browse-cities'>Browse Cities</label>
                    <select id='browse-cities'>
                        {cities.map(city => {
                            return <option key={city.id} value='{city.name}'>{city.name}</option>
                        })}
                    </select>
                    <div>
                        <h4>Add a City <i className="fas fa-plus-circle"></i></h4>
                        <label htmlFor='add-city'>
                            City Name
                        </label>
                        <input type='text' id='add-city' name='add-city'/>
                    </div>
                </section>
                <section className='DashContainer'>
                    <DashNav />
                    <section className='DashMainPosts'>
                        <AddPost />
                    </section>
                </section>
            </section>           
        )
    }
}

export default Dashboard