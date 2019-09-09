import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../components/App/App.css'
import DashNav from '../../components/DashNav/DashNav'
import cities from '../../data/cities'

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
                {/* <section className='DashContainer'> */}
                    <DashNav />
                    <div className='DashMainPosts'>
                        <div className='DashMainPosts__addPost'>
                            <div>
                               Post a new message
                            </div>
                            <div>
                                <label htmlFor='category'>Category</label>
                                <select id='category'>
                                    <option value='crime'>Crime and Safety </option>
                                    <option value='events'>Upcoming Events </option>
                                    <option value='lost'>Lost and Found</option>
                                </select> 
                            </div>
                            <div>
                                <label htmlFor='subject'>Subject</label>
                                <input type='text' id='subject' name='subject'></input>
                            </div>
                            
                                <label htmlFor='message'>Message</label>
                                <textarea id='message' name='message' rows='5' cols='30'>

                                </textarea>
                            
                        </div>
                    </div>
                {/* </section> */}
            </section>           
        )
    }
}

export default Dashboard