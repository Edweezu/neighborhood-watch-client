/* global google */
import React from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext';
import AutoComplete from '../../components/AutoComplete/AutoComplete'
import Footer from '../../components/Footer/Footer'
import config from '../../config'
import TokenService from '../../services/token-service'
import UsersApiService from '../../services/users-api-service'
/* global google */

class ProfilePage extends React.Component {

    static contextType = MainContext

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
        // console.log('hash outside func', window.location.hash)
        if(!window.location.hash) {
            // console.log('hash in func', window.location.hash)
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { userId } = this.props.match.params
        const { country, state, cityinput, first_name, last_name, email } = this.state
        //get user details from userId

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
        const { error, country, state, cityinput, first_name, last_name, email } = this.state
        // const { place, onPlaceChanged } = this.context
    
        // const AddressDetails = props => {
        //     return (
        //         <div>
        //           <pre>{JSON.stringify(props.place, null, 2)}</pre>
        //         </div>
        //     )
        //   };

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
                                City   
                            </label>
                            <span className='astrik'>
                                *
                            </span>
                        </div>
                        <div className='LoginForm__signupLabel'>
                            {/* <input id='city' name='city' type='text'
                            required/> */}
                            {/* <AutoComplete onPlaceChanged={onPlaceChanged} /> */}
                            {/* <AddressDetails place={place} />  */}
                            <select name="country" className="ProfilePage__addSelect countries" id="countryId" onChange={this.handleChangeCountry} required>
                                <option value={country}>Select Country</option>
                            </select>
                            <select name="state" className="ProfilePage__addSelect states" id="stateId" onChange={this.handleChangeState} required>
                                <option value={state}>Select State</option>
                            </select>
                            <select name="city" className="ProfilePage__addSelect cities" id="cityId" onChange={this.handleChangeCity} required>
                                <option value={cityinput}>Select City</option>
                            </select>
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
                        <button className="btn btn-sign-in" type='submit'>
                            Create an Account
                        </button>
                    </div>
                    {/* <Link to='/category/1'>Log In</Link> */}
                    {/* <a href='/category/1'>Log In</a> */}
                </form>
                <Footer />
            </section>
        )
    }
}

export default ProfilePage