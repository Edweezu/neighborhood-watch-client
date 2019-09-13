import React from 'react'
import userIcon from '../../app-images/user icon.png'
import users from '../../data/users'

class MyProfile extends React.Component {
    render () {
        const user = users[0]
        return (
            <section>
                <div className="image-upload">
                    <label htmlFor="file-input">
                            <img className='user__image' src={userIcon} alt='user-icon' width='200'/>
                            <p className='image-text'>
                                Add a Photo
                            </p>
                    </label>
                    <input id="file-input" type="file" />
                </div> 
                <div>
                    <h3>{user.username}</h3>
                    <form>
                    <div className='form-flex-container'>
                            <div className='profile-input'>
                                <label htmlFor="first-name">First Name </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="text" name="first-name" id="first-name"
                               required/>
                            </div>
                            <div className='profile-input'>
                                <label htmlFor="last-name">Last Name</label>
                                <input className='form-input' type="text" name="last-name" id="last-name"/>
                            </div>
                        </div>
                        <div className='form-flex-container'>
                            <div className='profile-input'>
                                <label htmlFor="city">City </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="text" name="city" id="city" required/>
                            </div>
                            <div className='profile-input'>
                                <label htmlFor="email">Email</label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="text" name="email" id="email" required/>
                            </div>
                        </div>
                        <div className='form-flex-container'>
                            <div className='profile-input'>
                                <label htmlFor="occupation">Occupation </label>
                                <input className='form-input' type="text" name="occupation" id="occupation"/>
                            </div>
                            <div className='profile-input'>
                                <label htmlFor="interest">Interests</label>
                                <input className='form-input' type="text" name="interest" id="interest"/>
                            </div>
                        </div>
                        <div className='button-container'>
                            <button className='submit-button' type="submit">Update</button>
                        </div>    
                    </form>
                </div>
            </section>
        )
    }
}

export default MyProfile