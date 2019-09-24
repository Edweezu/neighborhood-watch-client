import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import UsersApiService from '../../services/users-api-service'

class CreateAccount extends React.Component {

    state = {
        error: null
    }

    handleSubmit = (e) => {
        e.preventDefault()

        //get username and pw and submit
        const { username, password } = e.target
        const registeredUser = {
            username: username.value.toLowerCase(),
            password: password.value
        }

        

        return UsersApiService.registerAccount(registeredUser)
            .then(responseJson => {
                username.value = ''
                password.value = ''
                this.handleLoginSuccessful()
            })  
            .catch(responseJson => {
                console.log(' Error responseJson', responseJson)
                this.setState({
                    // error: responseJson.error
                    error: responseJson
                })
            })




    }

    handleLoginSuccessful = () => {
        const { history } = this.props
        history.push('/create-profile')
    }


    render () {

        const { error } = this.state
        console.log('state errorr', error)

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
                        <button className="btn btn-sign-in" type='submit'>
                            Continue
                        </button>
                    </div>
                    {/* <Link to='/create-profile'>Continue</Link> */}
                    {/* <a href='/create-profile'>Continue</a> */}
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



