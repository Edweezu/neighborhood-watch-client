/* global google */
import React from 'react'
import MainContext from '../../contexts/MainContext';
import Footer from '../../components/Footer/Footer'
import UsersApiService from '../../services/users-api-service'
import Nav from '../../components/Nav/Nav'
/* global google */

class ProfilePage extends React.Component {

    static contextType = MainContext
    static defaultProps = {
        history: {
          
        },
        match: {
          params: {}
        }
      }

    state = {
        error: null,
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        state: '',
        cityinput: ''
    }

    

    handleChangeFirst = (e) => {
        this.setState({
            first_name : e.target.value
        })
    }

    handleChangeLast = (e) => {
        this.setState({
            last_name : e.target.value
        })
    }

    handleChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    handleChangeCountry = (e) => {
        this.setState({
            country : e.target.value
        })
    }

    handleChangeState = (e) => {
        this.setState({
            state : e.target.value
        })
    }

    handleChangeCity = (e) => {
        this.setState({
            cityinput : e.target.value
        })
    }

    componentDidMount () {
        document.body.style.overflowY = 'auto'

        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { userId } = this.props.match.params
        const { country, state, cityinput, first_name, last_name, email } = this.state

        let userInfo = {

            first_name,
            last_name,
            email,
            country,
            state,
            cityinput
        }

        return UsersApiService.updateUserInfo(userInfo, userId)
            .then(responseJson => {
                console.log('ProfilePage user resJson', responseJson)
                this.props.history.push(`/category/1`)
            })
            .catch(err => {
                console.error(err)
            })
    }

    render () {
        const { error, first_name, last_name, email } = this.state

        return (
            <>
                <Nav />
                <section className='ProfilePage mainContent'> 
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
                                <input id='firstName' name='firstName' type='text' value={first_name} onChange={this.handleChangeFirst}
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
                                <input id='lastName' name='lastName' type='text' value={last_name} onChange={this.handleChangeLast}
                                />
                            </div>
                        </div>
                        <div className='LoginForm__signupElement'>
                            <div className='LoginForm__signupLabel'>
                                <label htmlFor='city'>
                                    Location   
                                </label>
                                <span className='astrik'>
                                    *
                                </span>
                            </div>
                            <div className='LoginForm__signupLabel'>
                                <div className='selectContainer'>
                                    <select name="country" className="ProfilePage__addSelect countries" id="countryId" onChange={this.handleChangeCountry} required>
                                        <option value=''>Select Country</option>
                                    </select>
                                </div>
                                <div className='selectContainer'>
                                    <select name="state" className="ProfilePage__addSelect states" id="stateId" onChange={this.handleChangeState} required>
                                        <option value=''>Select State</option>
                                    </select>
                                </div>
                                <div className='selectContainer'>
                                    <select name="city" className="ProfilePage__addSelect cities" id="cityId" onChange={this.handleChangeCity} required>
                                        <option value=''>Select City</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='LoginForm__signupElement'>
                            <div className='LoginForm__signupLabel'>
                                <label htmlFor='email'>
                                    Email   
                                </label>
                                <span className='astrik'>
                                    *
                                </span>
                            </div>
                            <div className='LoginForm__signupLabel'>
                                <input id='email' name='email' type='text' value={email} onChange={this.handleChangeEmail}
                                required/>
                            </div>
                        </div>
                        <div className='signin-button'>
                            <button className="btn btn_signIn" type='submit'>
                                Create an Account
                            </button>
                        </div>
                    </form>
                    <Footer />
                </section>
            </>
        )
    }
}

export default ProfilePage