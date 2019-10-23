import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'


class LandingPage extends React.Component {
    render () {
        return (
            <section className='LandingPage'>
                <section>
                    <header className='LandingPage__header'>
                        <h1>An Online Social Community</h1>
                        <p>Discover what's going on in your city today.</p>
                        <div className='LandingPage__btnContainer'>
                            <Link className="link register_btn" to='/register'>Sign Up</Link>
                        </div>
                        <div className='LandingPage__btnContainer'>
                            <Link className="link login_btn" to='/login'>Login</Link>
                        </div>  
                    </header>
                    {/* <h2 className='LandingPage__descriptHeader'>
                        Neighborhood Watch Functionalities
                    </h2> */}
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
                        <div className='LandingPage__btnReminder'>
                            <Link className="link register_btn" to='/register'>Sign Up</Link>
                        </div>
                    </section>   
                </section>
            <Footer />
            </section>
        )
    }
}

export default LandingPage