import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'


export default class EditProfileForm extends React.Component {

    static defaultProps = {
        updateProfileAbout: () => {
 
        }
     }

    state = {
        showProfileForm: false,
        first_name: '',
        last_name: '',
        email: '',
        occupation: '',
        interests: '',
        make_private: false
    }

    componentDidMount () {
        // console.log('show', localStorage.getItem('showLocationForm'))
        console.log('mounting')

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
            console.log('resp', responseJson)
            for (let item in responseJson) {
                if (responseJson[item] === null) {
                    responseJson[item] = ''
                }
            }
            this.setState({
                first_name: responseJson.first_name,
                last_name: responseJson.last_name,
                email: responseJson.email,
                occupation: responseJson.occupation,
                interests: responseJson.interests,
                make_private: responseJson.make_private
            })
        })
    }

    handleEditProfile = () => {
        this.setState({
            showProfileForm: !this.state.showProfileForm
        })
    }


    capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
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

    changeVisibility = (e) => {
        this.setState({
            make_private: !this.state.make_private
        })
    }


    handleBasicSubmit = (e) => {
        const { updateProfileAbout } = this.props
        e.preventDefault()

        this.setState({
            uploading: true
        })

        let { first_name, last_name, email, occupation, interests, make_private } = this.state
        let updatedProfile = {
            first_name,
            last_name,
            email,
            occupation,
            interests,
            make_private
        }

        console.log('before send patch', updatedProfile)

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

            for (let item in responseJson) {
                if (responseJson[item] === null) {
                    responseJson[item] = ''
                }
            }

            this.setState({
                first_name: responseJson.first_name,
                last_name: responseJson.last_name,
                email: responseJson.email,
                occupation: responseJson.occupation,
                interests: responseJson.interests,
                showProfileForm: false,
                make_private: responseJson.make_private
            }, () =>  updateProfileAbout(responseJson))
          
        })
        .catch(err => {
            console.error(err)
        })

    }


    render () {
        const { first_name, last_name, email, occupation, interests, showProfileForm, make_private } = this.state
        console.log('make priv', make_private)
        return (
            <section>
                <button type='button' onClick={this.handleEditProfile}>
                    Edit Profile
                </button>
                {showProfileForm ? (
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
                         <div className='LoginForm__signupElement'>
                             <div className='LoginForm__signupLabel'>
                                 <label htmlFor="occupation" className='LoginForm__signupLabel'>Occupation </label>
                             </div>
                             <div className='LoginForm__signupLabel'>
                                 <input className='form-input' type="text" name="occupation" id="occupation" value={this.capitalizeName(occupation)} onChange={this.changeOccupation}/>
                             </div>
                         </div>
                     </div>
                     <div className='form-flex-container'>
                         <div className='LoginForm__signupElement'>
                             <div className='LoginForm__signupLabel'>
                                 <label htmlFor="interest" className='LoginForm__signupLabel'>Interests</label>
                             </div>
                             <div className='LoginForm__signupLabel'>
                                 <input className='form-input' type="text" name="interests" id="interests" value={this.capitalizeName(interests)} onChange={this.changeInterests}/>
                             </div>     
                         </div>
                         <div className='LoginForm__signupElement'>
                             <div className='ProfileForm__checkbox'>
                                 <label htmlFor="showProfile" className='LoginForm__signupLabel'><strong>Make Profile Private?</strong></label>
                                 <input className='form-input' type="checkbox" name="showProfiles" id="showProfiles" value={make_private} onChange={this.changeVisibility} defaultChecked={make_private}/>
                             </div>
                             
                         </div>
                     </div>
                     <div className='button-container'>
                         <button className='submit-button' type="submit">Update Profile</button>
                     </div>    
                 </form>
                ): null}
               
            </section>
        )
    }
}