import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import UsersApiService from '../../services/users-api-service'
import Nav from '../../components/Nav/Nav'

class CreateAccount extends React.Component {

    state = {
        error: null
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { username, password } = e.target
        const registeredUser = {
            username: username.value.toLowerCase(),
            password: password.value
        }

        return UsersApiService.registerAccount(registeredUser)
            .then(responseJson => {
                username.value = ''
                password.value = ''
                this.props.history.push(`/create-profile/${responseJson.id}`)
            })  
            .catch(responseJson => {
                this.setState({
                    error: responseJson.error
                })
                console.error(responseJson)
            })
    }

   componentDidMount () {
        document.body.style.overflowY = 'auto'
   }

    render () {

        const { error } = this.state

        return (
            <section className='mainContent'>
                <Nav />
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
                                />
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
                                />
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
                                <input id='confirm-pw' name='confirm-pw' type='password' />
                            </div>
                        </div>
                        <div className='signin-button'>
                            <button className="btn btn_signIn" type='submit'> 
                                Continue
                            </button>
                        </div>
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



