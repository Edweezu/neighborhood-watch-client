import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Nav from '../../components/Nav/Nav'

class LandingPage extends React.Component {

    componentDidMount () {
        document.body.style.overflowY = 'auto'
    }

    render () {
        return (
            <section className='mainContent'>
                <Nav />
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
                        <section className='LandingPage__descriptContainer'>
                            <section className='LandingPage__descriptOne'>
                                <i className="fas fa-lock"></i>
                                <h3>Secure</h3> 
                                <p className='LandingPage__landingDescript'>
                                Create a profile and join our network with members that are 100% verified.
                                </p>
                            </section>
                            <section className='LandingPage__descriptTwo'>
                                <i className="fas fa-search"></i>
                                <h3>Discover</h3>
                                <p className='LandingPage__landingDescript'>Stay up to date on upcoming local events, the latest local crime, and much more.</p>
                            </section>
                            <section className='LandingPage__descriptTwo'>
                                <i className="fas fa-city"></i>
                                <h3>Connect</h3>
                                <p className='LandingPage__landingDescript'>Make lasting connections with your fellow neighbors and help grow your city's page.</p>
                            </section>
                            <div className='LandingPage__btnReminder'>
                                <Link className="link register_btn" to='/register'>Sign Up</Link>
                            </div>
                        </section>   
                    </section>  
                </section>
                <Footer long={'long'}/>
            </section>
        )   
    }
}

export default LandingPage