import React from 'react'
import userIcon from '../../app-images/user icon.png'
// import users from '../../data/users'
import DashNav from '../../components/DashNav/DashNav'
import MainContext from '../../contexts/MainContext'
import config from '../../config'
import TokenService from '../../services/token-service'
// import Spinner from '../../components/Spinner/Spinner'
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm'
import EditProfileImage from '../../components/EditImageModal/EditImageModal'
import addPhotoIcon from '../../app-images/profile-add-photo.png'

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
        showLocationForm: eval(localStorage.getItem('showLocationForm')) || false,
        showImageModal: false
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
                interests: responseJson.interests,
                image: responseJson.image,
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
                image: responseJson.image,
                imageCopy: responseJson.image
            })
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
            image: URL.createObjectURL(e.target.files[0])
        })
    }

    updateProfileAbout = (responseJson) => {
        this.setState({
            first_name: responseJson.first_name,
            last_name: responseJson.last_name,
            email: responseJson.email,
            occupation: responseJson.occupation,
            interests: responseJson.interests,
        })
    }

    updateProfileImage = (responseJson) => {
        this.setState({
           image: responseJson.image,
           showImageModal: false
        })
    }

   handleShowImageModal = () => {
       this.setState({
        showImageModal: true
       })
   }

   handleHideImageModal = () => {
       this.setState({
        showImageModal: false
       })
   }

   handleMouseOver = () => {
       this.setState({
           image: addPhotoIcon
       })
   }

   handleMouseLeave = () => {
       this.setState({
           image: this.state.imageCopy2
       })
   }

    render () {
      
        // console.log('state', this.state)
        let { first_name, last_name,  state, city, email, occupation, interests, image , showImageModal } = this.state
        
        return (
            <section className='MyProfile'>
                
                <section className='MyProfile__userContainer'>
                    <h1>My Profile</h1>
                    <DashNav />
                    <section className='MyProfile__userInfo'>
                        <form onSubmit={this.handleImageSubmit}>
                            <div className="image-upload">
                                {!image ? <label htmlFor="image" className='MyProfile__image'>
                                        <img src={userIcon} alt='user-icon' width='175px' height='175px'/>
                                        {/* <p className='image-text'>
                                            Add a Photo
                                        </p> */}
                                </label> : <label htmlFor="image" className='MyProfile__image'>
                                        <img className='MyProfile__userImage' src={image} alt='user-icon' width='200' height='200px'/>
                                        {/* <p className='image-text'>
                                            Add a Photo
                                        </p> */}
                                </label>}
                                <button className='btn' type='button' onClick={this.handleShowImageModal}>Update Photo</button> 
                                {/* <input type='file' id='image' name='image' onChange={this.handleImageChange} /> */}
                                {/* <button type='submit'>Submit Profile Picture</button> */}
                            </div>
                        </form>
                        {showImageModal ? 
                            <EditProfileImage  
                                showImageModal={showImageModal}
                                handleHideImageModal={this.handleHideImageModal}
                                updateProfileImage={this.updateProfileImage}
                            /> 
                            : null
                        }
                        <div className='MyProfile__headers'>
                            <h2>{this.capitalizeName(first_name)} {this.capitalizeName(last_name)}</h2>
                            <p>{city}, {state}</p>
                            <button className='btn' type='button' onClick={this.showLocationModal}>
                                Edit Location
                            </button>
                        </div>
                        <section>
                            <div className={this.showHideClassName()}>
                                <section className='modal-mainTwo'>
                                    <form className='EditModal__form' onSubmit={this.handleLocationSubmit}>
                                        <div className='closeModalDiv'>
                                            <button type='button' onClick={this.hideLocationModal}>
                                                <span className="fas fa-times" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <div className='LoginForm__signupElement modalSelect'>
                                            {/* <div className='LoginForm__signupLabel'>
                                                <label className='LoginForm__signupLabel'>Update Location</label>
                                            </div> */}
                                            <h3>Update Location</h3>
                                            {/* <div className='LoginForm__signupLabel'> */}
                                            <div className='selectContainer'>
                                                <select name="country" className="ProfilePage__addSelect countries" id="countryId" onChange={this.changeCountry} required>
                                                    <option value="">Select Country</option>
                                                </select>
                                            </div>
                                            <div className='selectContainer'>
                                                <select name="state" className="ProfilePage__addSelect states" id="stateId" onChange={this.changeState} required>
                                                        <option value="">Select State</option>
                                                </select>
                                            </div>
                                            <div className='selectContainer'>
                                                <select name="city" className="ProfilePage__addSelect cities" id="cityId" onChange={this.changeCity} required>
                                                    <option value="">Select City</option>
                                                </select>
                                            </div>      
                                        </div>
                                        <button className='btn' type='submit'>Submit</button>
                                    </form>
                                </section> 
                            </div>    
                        </section>
                        <div className='list-section'>
                            <h3>About Me</h3>
                            <div className={'list-info-div ' +  (!email ? 'display-none' : '') }>
                                <i className="fas fa-envelope"></i>
                                <span className='trip-details'>
                                    {email}
                                </span>
                            </div>
                            <div className={'list-info-div ' +  (!occupation ? 'display-none' : '') }>
                                <i className="fas fa-suitcase"></i>
                                <span className='trip-details'>
                                    {occupation}
                                </span>
                            </div>
                            <div className={'list-info-div ' +  (!interests ? 'display-none' : '') }>
                                <i className="far fa-futbol"></i>
                                <span className='trip-details'>
                                    Enjoys {interests}
                                </span>
                            </div>
                        </div>
                        <EditProfileForm 
                            updateProfileAbout={this.updateProfileAbout}
                        />    
                    </section>
                </section>
            </section>       
        )
    }
}

export default MyProfile


