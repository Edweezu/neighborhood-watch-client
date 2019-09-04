import React from 'react'
import { Link } from 'react-router-dom'

class CreateAccount extends React.Component {

    state = {
        error: null
    }

    render () {

        const { error } = this.state

        return (
            <main className='RegisterPage'>
                <h2>
                    Create an Account
                </h2>
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='signup-element'>
                        <div className='signup-label'>
                            <label htmlFor='username'>
                                Username    
                            </label>
                            <span className='astrik'>
                                *
                            </span>
                        </div>
                        <div className='signup-input'>
                            <input id='username' name='username' type='text'
                            required/>
                        </div>
                    </div>
                    <div className='signup-element'>
                        <div className='signup-label'> 
                            <label htmlFor='password'>
                                Password    
                            </label>
                            <span className='astrik'>*</span>
                        </div>
                        <div className='signup-input'>
                            <input id='password' name='password' type='password'
                            required/>
                        </div>
                    </div>
                    <div className='signup-element'>
                        <div className='signup-label'>
                            <label htmlFor='confirm-pw'>
                                Confirm Password    
                            </label>
                            <span className='astrik'>*</span>
                        </div>
                        <div className='signup-input'>
                            <input id='confirm-pw' name='confirm-pw' type='password' required/>
                        </div>
                    </div>
                    {/* <div className='signin-button'>
                        <button className="btn btn-sign-in" type='submit'>
                            Create an Account
                        </button>
                    </div> */}
                    <Link to='/profile'>Continue</Link>
                    <div className='signup-demo'>
                        <p>Password must be longer than 8 characters and contain one upper case, lower case, number and special character.</p>
                    </div>
                    <div className='login-form-redirect'>
                        <Link to='/login'>Already have an Account?</Link>
                    </div>
                </form>
            </main>   
        )
    }
}

export default CreateAccount