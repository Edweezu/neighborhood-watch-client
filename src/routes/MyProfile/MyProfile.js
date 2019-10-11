import React from 'react'
import userIcon from '../../app-images/user icon.png'
// import users from '../../data/users'
import DashNav from '../../components/DashNav/DashNav'
import MainContext from '../../contexts/MainContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import Spinner from '../../components/Spinner/Spinner'

class MyProfile extends React.Component {

    static contextType = MainContext

    state = {
        username: '',
        first_name: '',
        last_name: '',
        country: '',
        state: '',
        city: '',
        email: '',
        occupation: '',
        interests: '',
        uploading: false,
        image: null,
        //need to use eval here b/c getItem returns 'false' as a string which shows the modal because 'false' is converted to true
        showLocationForm: eval(localStorage.getItem('showLocationForm')) || false
    }

    componentDidMount () {
        // console.log('show', localStorage.getItem('showLocationForm'))

        if (this.state.showLocationForm) {
            document.body.style.overflowY = 'hidden'
        }

        return fetch(`${config.API_ENDPOINT}/users/profile`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            for (let item in responseJson) {
                if (responseJson[item] === null) {
                    responseJson[item] = ''
                }
            }
            this.setState({
                username: responseJson.username,
                first_name: responseJson.first_name,
                last_name: responseJson.last_name,
                country: responseJson.country,
                state: responseJson.state,
                city: responseJson.city,
                email: responseJson.email,
                occupation: responseJson.occupation,
                interests: responseJson.interests

            })
        })
    }

    changeFirstName = (e) => {
        this.setState({
            first_name: e.target.value
        })
    }

    changeLastName= (e) => {
        this.setState({
            last_name: e.target.value
        })
    }

    changeCountry = (e) => {
        this.setState({
            country: e.target.value
        })
    }

    changeState = (e) => {
        this.setState({
            state: e.target.value
        })
    }

    changeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    changeOccupation = (e) => {
        this.setState({
            occupation: e.target.value
        })
    }

    changeInterests = (e) => {
        this.setState({
            interests: e.target.value
        })
    }

    capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    handleBasicSubmit = (e) => {
        e.preventDefault()

        this.setState({
            uploading: true
        })

        let { first_name, last_name, email, occupation, interests } = this.state
        let updatedProfile = {
            first_name,
            last_name,
            email,
            occupation,
            interests
        }

        return fetch(`${config.API_ENDPOINT}/users/profile`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(updatedProfile)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            console.log('response basic', responseJson)
            this.setState({
                first_name: responseJson.first_name,
                last_name: responseJson.last_name,
                email: responseJson.email,
                occupation: responseJson.occupation,
                interests: responseJson.interests,
                uploading: false
            })
        })
        .catch(err => {
            console.error(err)
        })

    }

    showLocationModal = () => {
        this.setState({
            showLocationForm: true
        }, () => {
            //setting true as local storage so state retrieves it when window reloads so modal stays open 
            localStorage.setItem('showLocationForm', this.state.showLocationForm)
            window.location.reload()
        }) 
    }

    hideLocationModal = () => {
        document.body.style.overflowY = 'auto'
        this.setState({
            uploading: false,
            showLocationForm: false
        }, () => {
            console.log("hide bool", this.state)
            localStorage.setItem('showLocationForm', this.state.showLocationForm)
        })
    }

    hideAndUpdateModal = (responseJson) => {
        document.body.style.overflowY = 'auto'
        this.setState({
            uploading: false,
            showLocationForm: false,
            country: responseJson.country,
            state: responseJson.state,
            city: responseJson.city,
        }, () => {
            console.log("hide bool", this.state)
            localStorage.setItem('showLocationForm', this.state.showLocationForm)
        })
    }

    handleLocationSubmit = (e) => {
        e.preventDefault()
        this.setState({
            uploading: true
        })

       
        let { country, state, city, } = this.state
        let newLocation = {
            country,
            state,
            city
        }

        return fetch(`${config.API_ENDPOINT}/users/profile`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newLocation)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            console.log('submit response', responseJson)
            // this.context.updateComment(responseJson)
            this.hideAndUpdateModal(responseJson)
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleImageSubmit = (e) => {
        e.preventDefault()

        e.preventDefault()

        let { message, post_category, subject, place_id } = this.state

        this.setState({
            uploading: true
        })

        console.log('event target', e.target['image'].files[0])

        let formData = new FormData()

        formData.append('image', e.target['image'].files[0])

        return fetch(`${config.API_ENDPOINT}/users/profile`, {
            method: 'PATCH',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
             console.log('patch responsejson', responseJson)
            this.setState({
                uploading: false,
                image: responseJson.image
            })
            this.hideModal()
        })

    }

    // showHideClassName = () => {
    //     let { showLocationForm } = this.state
    //     if (showLocationForm === "false" || showLocationForm == false) {
    //         return 'modal display-none'
    //     } else {
    //         return 'modal display-block'
    //     }
    // }

    showHideClassName = () => {
        let { showLocationForm } = this.state
        if (!showLocationForm) {
            return 'modal display-none'
        } else {
            return 'modal display-block'
        }
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
  

    render () {
      
        console.log('state', this.state)
        let { username, first_name, last_name, country, state, city, email, occupation, interests, uploading, showLocationForm, image } = this.state
        
        return (
            <section className='MyProfile'>
                
                <section className='MyProfile__userContainer'>
                    <h2>My Profile</h2>
                    <DashNav />
                    <section className='MyProfile__userInfo'>
                        <form onSubmit={this.handleImageSubmit}>
                            <div className="image-upload">
                                {!image ? <label htmlFor="image" className='LoginForm__signupLabel'>
                                        <img className='user__image' src={userIcon} alt='user-icon' width='200'/>
                                        <p className='image-text'>
                                            Add a Photo
                                        </p>
                                </label> : <label htmlFor="image" className='LoginForm__signupLabel'>
                                        <img className='user__image' src={image} alt='user-icon' width='200'/>
                                        <p className='image-text'>
                                            Add a Photo
                                        </p>
                                </label>}
                                
                                <input type='file' id='image' name='image' onChange={this.handleImageChange} />
                            </div> 
                        </form>
                      
                        <div>
                            <div className='MyProfile__headers'>
                                <h3>{this.capitalizeName(username)}</h3>
                                <h4>{city}, {state}</h4>
                                <button type='button' onClick={this.showLocationModal}>
                                    Edit
                                </button>
                            </div>
                            <section>
                                {uploading ? (
                                    <div>
                                        <Spinner />
                                    </div>
                                ) : (
                                            <div className={this.showHideClassName()}>
                                                <section className='modal-main'>
                                                    <form onSubmit={this.handleLocationSubmit}>
                                                        <button type='button' onClick={this.hideLocationModal}>
                                                            <span className="fas fa-times" aria-hidden="true"></span>
                                                        </button>
                                                        <div className='LoginForm__signupElement'>
                                                            <div className='LoginForm__signupLabel'>
                                                                <label className='LoginForm__signupLabel'> Update Location</label>
                                                            </div>
                                                            <div className='LoginForm__signupLabel'>
                                                                <select name="country" className="ProfilePage__addSelect countries" id="countryId" onChange={this.changeCountry} required>
                                                                    <option value="">Select Country</option>
                                                                </select>
                                                                <select name="state" className="ProfilePage__addSelect states" id="stateId" onChange={this.changeState} required>
                                                                    <option value="">Select State</option>
                                                                </select>
                                                                <select name="city" className="ProfilePage__addSelect cities" id="cityId" onChange={this.changeCity} required>
                                                                    <option value="">Select City</option>
                                                                </select>
                                                            </div>      
                                                        </div>
                                                        <button type='submit'>Submit</button>
                                                    </form>
                                                </section> 
                                            </div>
                                        ) 
                                    
                                }
                            </section>
                            <form className='MyProfile__form' onSubmit={this.handleBasicSubmit}>
                                <div className='form-flex-container'>
                                        <div className='LoginForm__signupElement'>
                                            <div className='LoginForm__signupLabel'>
                                                <label htmlFor="first-name" >First Name </label>
                                                <span className='astrik'>
                                                    *
                                                </span>
                                            </div>
                                            <div className='LoginForm__signupLabel'>
                                                <input className='form-input' type="text" name="first-name" id="first-name"
                                                required value={this.capitalizeName(first_name)} onChange={this.changeFirstName}/>
                                            </div>
                                        </div>
                                        <div className='LoginForm__signupElement'>
                                            <div className='LoginForm__signupLabel'>
                                                <label htmlFor="last-name" className='LoginForm__signupLabel'>Last Name</label>
                                            </div>
                                            <div className='LoginForm__signupLabel'>
                                                <input className='form-input' type="text" name="last-name" id="last-name" value={this.capitalizeName(last_name)} onChange={this.changeLastName}/>
                                            </div>      
                                        </div>
                                </div>
                                <div className='form-flex-container'>
                                    {/* <div className='LoginForm__signupElement'>
                                        <div className='LoginForm__signupLabel'>
                                            <label className='LoginForm__signupLabel'> Update Location</label>
                                        </div>
                                        <div className='LoginForm__signupLabel'>
                                            <select name="country" className="ProfilePage__addSelect countries" id="countryId" onChange={this.changeCountry} required>
                                                <option value={country}>Select Country</option>
                                            </select>
                                            <select name="state" className="ProfilePage__addSelect states" id="stateId" onChange={this.changeState} required>
                                                <option value={state}>Select State</option>
                                            </select>
                                            <select name="city" className="ProfilePage__addSelect cities" id="cityId" onChange={this.changeCity} required>
                                                <option value={city}>Select City</option>
                                            </select>
                                        </div>      
                                    </div> */}
                                    <div className='LoginForm__signupElement'>
                                        <div className='LoginForm__signupLabel'>
                                            <label htmlFor="email" className='LoginForm__signupLabel'>Email</label>
                                            <span className='astrik'>
                                                *
                                            </span>
                                        </div>
                                        <div className='LoginForm__signupLabel'>
                                            <input className='form-input' type="text" name="email" id="email" required value={this.capitalizeName(email)} onChange={this.changeEmail}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-flex-container'>
                                    <div className='LoginForm__signupElement'>
                                        <div className='LoginForm__signupLabel'>
                                            <label htmlFor="occupation" className='LoginForm__signupLabel'>Occupation </label>
                                        </div>
                                        <div className='LoginForm__signupLabel'>
                                            <input className='form-input' type="text" name="occupation" id="occupation" value={this.capitalizeName(occupation)} onChange={this.changeOccupation}/>
                                        </div>
                                    </div>
                                    <div className='LoginForm__signupElement'>
                                        <div className='LoginForm__signupLabel'>
                                            <label htmlFor="interest" className='LoginForm__signupLabel'>Interests</label>
                                        </div>
                                        <div className='LoginForm__signupLabel'>
                                            <input className='form-input' type="text" name="interests" id="interests" value={this.capitalizeName(interests)} onChange={this.changeInterests}/>
                                        </div>     
                                    </div>
                                </div>
                                <div className='button-container'>
                                    <button className='submit-button' type="submit">Update Profile</button>
                                </div>    
                            </form>
                        </div>
                    </section>
                  
                </section>
            </section>
           
        )
    }
}

export default MyProfile


