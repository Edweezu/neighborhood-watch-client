/* global google */
import React from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext';
import AutoComplete from '../../components/AutoComplete/AutoComplete'
import Footer from '../../components/Footer/Footer'
/* global google */

class ProfilePage extends React.Component {

    static contextType = MainContext

    state = {
        error: null
    }

    render () {
        const { error } = this.state
        const { place, onPlaceChanged } = this.context

        const AddressDetails = props => {
            return (
                <div>
                  <pre>{JSON.stringify(props.place, null, 2)}</pre>
                </div>
            )
          };

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
                            <select name="country" className="ProfilePage__addSelect countries" id="countryId">
                                <option value="">Select Country</option>
                            </select>
                            <select name="state" className="ProfilePage__addSelect states" id="stateId">
                                <option value="">Select State</option>
                            </select>
                            <select name="city" className="ProfilePage__addSelect cities" id="cityId">
                                <option value="">Select City</option>
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
                            <input id='email' name='email' type='text'
                            required/>
                        </div>
                    </div>
                    {/* <div className='signin-button'>
                        <button className="btn btn-sign-in" type='submit'>
                            Create an Account
                        </button>
                    </div> */}
                    {/* <Link to='/category/1'>Log In</Link> */}
                    <a href='/category/1'>Log In</a>
                </form>
                <Footer />
            </section>
        )
    }
}

export default ProfilePage