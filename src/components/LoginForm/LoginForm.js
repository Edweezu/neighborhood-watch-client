import React from 'react'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {

    state = {
        error: null,
        password: 'Testing123!',
        username: 'demo'
    }
    
    render () {
        const { error, username, password } = this.state

        return (
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
                    {/* <input id='username' name='username' type='text' placeholder='demo' value={username} onChange={this.handleChangeUser} required/> */}
                    <input id='username' name='username' type='text' placeholder='demo' required/>
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
                    {/* <input id='password' name='password' type='password' placeholder='Testing123!' value={password} onChange={this.handleChangePassword} required/> */}
                    <input id='password' name='password' type='password' placeholder='Testing123!'  required/>
                </div> 
            </div>
            {/* <div className='signin-button'>
                <button className="btn btn-sign-in" type='submit'>
                    Sign In 
                </button>
            </div> */}
            <Link to='/dashboard'>Sign In</Link>
            <div className='login-demo'>
                <h4>Demo Account</h4>
                <p>Username: demo</p>
                <p>Password: Testing123!</p>
            </div>
            <div className='login-form-redirect'>
                <Link to='/register'>Don't have an account? Create one.</Link>
            </div>
        </form>
        )
    }
}

export default LoginForm