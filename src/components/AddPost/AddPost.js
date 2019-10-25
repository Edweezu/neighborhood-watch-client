import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import { withRouter } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
// import { findPlace } from '../../helpers'
import Spinner from '../Spinner/Spinner'

class AddPost extends React.Component {

    state = {
        showAddForm: false,
        image: null,
        uploading: false
    }

    handleAddPostOpen = () => {
        document.body.style.overflowY = 'hidden'
        this.setState({
            showAddForm: true
        })
    }
      handleAddPostClose = () => {
        document.body.style.overflowY = 'auto'
        this.setState({
            showAddForm: false,
            uploading: false
        })
    }



    static contextType = MainContext

    handleSubmitForm = () => {
        this.setState({
            showForm: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({
            uploading: true
        })
       
        let { subject, message, post_category, browse_cities } = e.target
        let formData = new FormData()

        formData.append('subject', subject.value)
        formData.append('message', message.value)
        formData.append('post_category', post_category.value)
        formData.append('place_id', browse_cities.value)
        formData.append('image', this.state.image)
       

        console.log('formdata', formData)

        return fetch(`${config.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                // 'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        //    body: JSON.stringify(formData)
           body: formData
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            // subject.value = ''
            // message.value = ''
            // this.handleSubmitForm()
            // this.setState({
            //     showForm: false
            // })
            console.log('new post', responseJson)
            this.context.addPost(responseJson)
            this.handleAddPostClose()
            // this.props.history.push(`/category/${responseJson.post_category}#main-menu-toggle`)
            // window.location.reload()
            
        })
        .catch(err => {
            console.error(err)
        })
    }

   
    
      
      handleImageChange = (e) => {
          this.setState({
            image: e.target.files[0]
          })
      }


    render () {
        // const { showForm } = this.state
        const { places } = this.context

        const { uploading, showAddForm } = this.state

        const showHideClassName = showAddForm ? 'modal display-block' : 'modal display-none'

        return (
            <section className='AddPost'>
                { uploading ? 
                    <div className={showHideClassName}>
                        <Spinner />
                    </div> 
                : ( <div className={showHideClassName}>
                        <section className='modal-main'>
                            <form className='EditModal__form' onSubmit={this.handleSubmit}>
                                <div className='closeModalDiv'>
                                    <button type='button'  onClick={this.handleAddPostClose}>
                                    <span className="fas fa-times" aria-hidden="true"></span>
                                    </button>
                                </div>
                                <div className='AddPost__formContainer'>
                                    {/* <div className='AddPost__formDiv selectModalDiv' >
                                        <label htmlFor='browse_cities'>Active Page</label>
                                            <select id='browse_cities' required>
                                                {places.map(place => {
                                                    return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                                })}
                                            </select>
                                    </div> */}
                                     <div className='LoginForm__signupElement modalSelect'>
                                        <div className='LoginForm__signupLabel'>
                                            <label htmlFor="browse_cities" className='LoginForm__signupLabel'>Active Page</label>
                                        </div>
                                        <div className='LoginForm__signupLabel selectModalDiv'>
                                            <select id='browse_cities' required>
                                                {places.map(place => {
                                                    return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                                })}
                                            </select>
                                        </div>      
                                    </div>
                                    <div className='LoginForm__signupElement modalSelect'>
                                        <div className='LoginForm__signupLabel'>
                                            <label htmlFor="post_category" className='LoginForm__signupLabel'>Category</label>
                                        </div>
                                        <div className='LoginForm__signupLabel selectModalDiv'>
                                            <select id='post_category' required>
                                                <option value='Crime and Alerts'>Crime and Alerts</option>
                                                <option value='Upcoming Events'>Upcoming Events </option>
                                                <option value='Lost and Found'>Lost and Found</option>
                                            </select>  
                                        </div>      
                                    </div>
                                    {/* <div className='AddPost__formDiv selectModalDiv'>
                                        <label htmlFor='post_category'>Category</label>
                                        <select id='post_category' required>
                                            <option value='Crime and Alerts'>Crime and Safety </option>
                                            <option value='Upcoming Events'>Upcoming Events </option>
                                            <option value='Lost and Found'>Lost and Found</option>
                                        </select>  
                                    </div> */}
                                    
                                    {/* <div className='AddPost__formDiv'>
                                        <label htmlFor='subject'>Subject</label>
                                        <input type='text' id='subject' name='subject'required></input>
                                    </div> */}
                                </div>
                                <div className='LoginForm__signupElement'>
                                        <div className='LoginForm__signupLabel'>
                                            <label htmlFor="subject" className='LoginForm__signupLabel'>Subject</label>
                                        </div>
                                        <div className='LoginForm__signupLabel subjectLabel'>
                                            <input type='text' id='subject' name='subject'required></input>
                                        </div>      
                                </div>
                                <div className='LoginForm__signupElement'>
                                    <div className='LoginForm__signupLabel'>
                                        <label htmlFor="message" className='LoginForm__signupLabel'>Message</label>
                                    </div>
                                    <div className='LoginForm__signupLabel'>
                                        <textarea type='text' id='message' name='message' required></textarea>
                                    </div>      
                                </div>
                                {/* <div className='messageAdd'>
                                    <label htmlFor='message'>Message</label>
                                    <textarea type='text' id='message' name='message' required></textarea>
                                </div> */}
                                <div className='AddPost__submitContainer'>
                                    
                                    <div className='AddPost__submitDiv'>
                                        <div>
                                            <span>
                                                <i className="fas fa-image"></i>
                                                Add Photo
                                            </span>
                                        </div>
                                            <label className='AddPost__fileInputLabel'>
                                                <input className='AddPost__fileInput' type='file' id='image' name='image' onChange={this.handleImageChange}/>
                                            </label>
                                    </div>
                                    <button className='btn' type='submit'>Submit</button>
                                </div>
                            </form>
                        </section>
                    </div>
                )}
                 <button type='button' onClick={this.handleAddPostOpen} className='post_btn'>
                     Create Post
                </button>
                <div id='AddPost__cover'></div>        
            </section>
        )    
    }
}

export default withRouter(AddPost)

