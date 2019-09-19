import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

class CreateAccount extends React.Component {

    state = {
        error: null
    }

    render () {

        const { error } = this.state

        return (
            <section>
            <section className='CreateAccount'>
                <h2>
                    Create an Account
                </h2>
                <form className='LoginForm' onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='LoginForm__signupElement'>
                        <div className='LoginForm__signupLabel'>
                            <label htmlFor='username'>
                                Username    
                            </label>
                            <span className='astrik'>
                                *
                            </span>
                        </div>
                        <div className='LoginForm__signupLabel'>
                            <input id='username' name='username' type='text'
                            required/>
                        </div>
                    </div>
                    <div className='LoginForm__signupElement'>
                        <div className='LoginForm__signupLabel'> 
                            <label htmlFor='password'>
                                Password    
                            </label>
                            <span className='astrik'>*</span>
                        </div>
                        <div className='LoginForm__signupLabel'>
                            <input id='password' name='password' type='password'
                            required/>
                        </div>
                    </div>
                    <div className='LoginForm__signupElement'>
                        <div className='LoginForm__signupLabel'>
                            <label htmlFor='confirm-pw'>
                                Confirm Password    
                            </label>
                            <span className='astrik'>*</span>
                        </div>
                        <div className='LoginForm__signupLabel'>
                            <input id='confirm-pw' name='confirm-pw' type='password' required/>
                        </div>
                    </div>
                    {/* <div className='signin-button'>
                        <button className="btn btn-sign-in" type='submit'>
                            Create an Account
                        </button>
                    </div> */}
                    {/* <Link to='/create-profile'>Continue</Link> */}
                    <a href='/create-profile'>Continue</a>
                    <div className='LoginForm__signupDemo'>
                        <p>Password must be longer than 8 characters and contain one upper case, lower case, number and special character.</p>
                    </div>
                    <div className='LoginForm__redirect'>
                        <Link to='/login'>Already have an Account?</Link>
                    </div>
                </form>
            </section>
             <Footer />
            </section>  
        )
    }
}

export default CreateAccount



