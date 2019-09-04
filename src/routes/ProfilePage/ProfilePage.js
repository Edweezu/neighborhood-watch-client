import React from 'react'
import { Link } from 'react-router-dom'

class ProfilePage extends React.Component {

    state = {
        error: null
    }

    render () {
        const { error } = this.state

        return (
            <section className='ProfilePage'> 
                 <h2>
                    Create a Profile
                </h2>
                <form className='LoginForm' onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='LoginForm__signupElement'>
                        <div className='LoginForm__signupLabel'>
                            <label htmlFor='firstName'>
                                First Name    
                            </label>
                            <span className='astrik'>
                                *
                            </span>
                        </div>
                        <div className='LoginForm__signupLabel'>
                            <input id='firstName' name='firstName' type='text'
                            required/>
                        </div>
                    </div>
                    <div className='LoginForm__signupElement'>
                        <div className='LoginForm__signupLabel'>
                            <label htmlFor='lastName'>
                                Last Name    
                            </label>
                        </div>
                        <div className='LoginForm__signupLabel'>
                            <input id='lastName' name='lastName' type='text'
                            />
                        </div>
                    </div>
                    <div className='LoginForm__signupElement'>
                        <div className='LoginForm__signupLabel'>
                            <label htmlFor='lastName'>
                                City   
                            </label>
                            <span className='astrik'>
                                *
                            </span>
                        </div>
                        <div className='LoginForm__signupLabel'>
                            <input id='lastName' name='lastName' type='text'
                            required/>
                        </div>
                    </div>
                    {/* <div className='signin-button'>
                        <button className="btn btn-sign-in" type='submit'>
                            Create an Account
                        </button>
                    </div> */}
                    <Link to='/dashboard'>Log In</Link>
                </form>
            </section>
        )
    }
}

export default ProfilePage