import React from 'react'


export default class EditProfileForm extends React.Component {

    state = {
        showProfileForm: false
    }

    handleEditProfile = () => {
        this.setState({
            showProfileForm: !this.state.showProfileForm
        })
    }


    capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }


    render () {
        const { first_name, last_name, email, occupation, interests, handleBasicSubmit, changeFirstName, changeLastName, changeInterests, changeEmail, changeOccupation } = this.props
        const { showProfileForm } = this.state

        return (
            <section>
                <button type='button' onClick={this.handleEditProfile}>
                    Edit Profile
                </button>
                {showProfileForm ? (
                     <form className='MyProfile__form' onSubmit={handleBasicSubmit}>
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
                                 required value={this.capitalizeName(first_name)} onChange={changeFirstName}/>
                             </div>
                         </div>
                         <div className='LoginForm__signupElement'>
                             <div className='LoginForm__signupLabel'>
                                 <label htmlFor="last-name" className='LoginForm__signupLabel'>Last Name</label>
                             </div>
                             <div className='LoginForm__signupLabel'>
                                 <input className='form-input' type="text" name="last-name" id="last-name" value={this.capitalizeName(last_name)} onChange={changeLastName}/>
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
                                 <input className='form-input' type="text" name="email" id="email" required value={this.capitalizeName(email)} onChange={changeEmail}/>
                             </div>
                         </div>
                     </div>
                     <div className='form-flex-container'>
                         <div className='LoginForm__signupElement'>
                             <div className='LoginForm__signupLabel'>
                                 <label htmlFor="occupation" className='LoginForm__signupLabel'>Occupation </label>
                             </div>
                             <div className='LoginForm__signupLabel'>
                                 <input className='form-input' type="text" name="occupation" id="occupation" value={this.capitalizeName(occupation)} onChange={changeOccupation}/>
                             </div>
                         </div>
                         <div className='LoginForm__signupElement'>
                             <div className='LoginForm__signupLabel'>
                                 <label htmlFor="interest" className='LoginForm__signupLabel'>Interests</label>
                             </div>
                             <div className='LoginForm__signupLabel'>
                                 <input className='form-input' type="text" name="interests" id="interests" value={this.capitalizeName(interests)} onChange={changeInterests}/>
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