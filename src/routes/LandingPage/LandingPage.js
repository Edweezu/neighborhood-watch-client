import React from 'react'
import { Link } from 'react-router-dom'

class LandingPage extends React.Component {
    render () {
        return (
            <main className='landing-page-container'
            >
                    <header className='landing-page-header'>
                    <h1>An Online Social Community for your City</h1>
                    <Link className="link btn" to='/register'>Get Started</Link>
                </header>
                <h2 className='landing-descript-header'>
                    Neighborhood Watch Functionalities
                </h2>
                <section className='landing-descript-container'>
                    <section className='landing-descript-one'>
                        <h3>Secured</h3> 
                        <p className='landing-description'>
                        Create a profile page and join our network with 100% verified members.
                        </p>
                    </section>
                    <section className='landing-descript-two'>
                        <h3>Discover</h3>
                        <p className='landing-description'>Find out about upcoming local events, crimes and statistics, and much more.</p>
                    </section>
                    <section className='landing-descript-two'>
                        <h3>Connected</h3>
                        <p className='landing-description'>Make Connections with your fellow neighbors and grow your city's page.</p>
                    </section>
                </section>   
                <section className='landing-page-reminder'>
                    <Link className="link btn" to='/register'>Get Started</Link>
                </section>
            </main>
        )
    }
}

export default LandingPage