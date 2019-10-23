import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import UsersApiService from '../../services/users-api-service'

class LoginForm extends React.Component {

    static defaultProps = {
        onLoginSuccess: () => {
            
        }
    }

    state = {
        error: null,
        password: '',
        username: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            error: null
        })

        const { username, password } = e.target
        // console.log('user', username.value)
        // console.log('pw', password.value)

        return UsersApiService.postLogin({
            username: username.value,
            password: password.value
        })
            .then(responseJson => {
                username.value = ''
                password.value = ''
                // this.context.loggedIn()
                this.props.onLoginSuccess()
            })
            .catch(err => {
                // this.setState({
                //     error: responseJson.error
                // })
                console.error(err)
            })


    }
    
    render () {
        // const { error, username, password } = this.state
        const { error } = this.state

        return (
            <section>
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
                
                
                    {/* <input id='username' name='username' type='text' placeholder='demo' value={username} onChange={this.handleChangeUser} required/> */}
                    <input id='username' name='username' type='text' placeholder='demo' required/> 
                </div> 
            </div>
            <div className='LoginForm__signupElement'>
                <div className='LoginForm__signupLabel'>
                    <label htmlFor='password'>
                        Password    
                    </label>
                    <span className='astrik'>*</span>
                     
                    {/* <input id='password' name='password' type='password' placeholder='Testing123!' value={password} onChange={this.handleChangePassword} required/> */}
                    <input id='password' name='password' type='password' placeholder='Testing123!'  required/> 
                </div>
            </div>
            <div className='signin-button'>
                <button className="btn btn_signIn" type='submit'>
                    Sign In 
                </button>
            </div>
            {/* <Link to='/category/1'>Sign In</Link> */}
            {/* <a href={`/category/1`}>Sign In</a> */}
            <div className='LoginForm__loginDemo'>
                <h4>Demo Account</h4>
                <p>Username: demo</p>
                <p>Password: Testing123!</p>
            </div>
            <div className='LoginForm__redirect'>
                <Link to='/register'>Don't have an account? Create one.</Link>
            </div>
        </form>
        <Footer />
        </section>
        )
    }
}

export default LoginForm