import React from 'react'
import { Link } from 'react-router-dom'

class LandingPage extends React.Component {
    render () {
        return (
            <section className='LandingPage'
            >
                    <header className='LandingPage__header'>
                    <h1>An Online Social Community for your City</h1>
                    <Link className="link btn" to='/register'>Get Started</Link>
                </header>
                <h2 className='LandingPage__descriptHeader'>
                    Neighborhood Watch Functionalities
                </h2>
                <section className='LandingPage__descriptContainer'>
                    <section className='LandingPage__descriptOne'>
                        <h3>Secured</h3> 
                        <p className='LandingPage__landingDescript'>
                        Create a profile page and join our network with 100% verified members.
                        </p>
                    </section>
                    <section className='LandingPage__descriptTwo'>
                        <h3>Discover</h3>
                        <p className='LandingPage__landingDescript'>Find out about upcoming local events, crimes and statistics, and much more.</p>
                    </section>
                    <section className='LandingPage__descriptTwo'>
                        <h3>Connected</h3>
                        <p className='LandingPage__landingDescript'>Make Connections with your fellow neighbors and grow your city's page.</p>
                    </section>
                </section>   
                <section className='LandingPage__reminder'>
                    <Link className="link btn" to='/register'>Get Started</Link>
                </section>
            </section>
        )
    }
}

export default LandingPage