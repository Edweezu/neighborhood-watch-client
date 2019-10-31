import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import { withRouter } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
import Spinner from '../Spinner/Spinner'

class AddPost extends React.Component {
    
    static contextType = MainContext

    state = {
        showAddForm: false,
        image: null,
        uploading: false,
        formDataImage: null,
        isMobile: true
    }


    componentDidMount () {
        window.addEventListener('overflow', this.overflowCheck)
        this.overflowCheck()
    }

    componentWillUnmount () {
        window.removeEventListener('overflow', this.overflowCheck)
    }

    overflowCheck = () => {
        let currentWidth = (window.innerWidth < 768)

        if (currentWidth !== this.state.isMobile) {
            this.setState({
                isMobile: currentWidth
            })
        }
    }

    handleAddPostOpen = () => {
        document.body.style.overflowY = 'hidden'
        this.setState({
            showAddForm: true
        })
    }
      handleAddPostClose = () => {
        
        this.state.isMobile ? document.body.style.overflowY = 'auto' : document.body.style.overFlow = 'hidden'
        
        this.setState({
            showAddForm: false,
            uploading: false
        }, () => window.location.reload())
    }

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
        formData.append('image', this.state.formDataImage)
       
        return fetch(`${config.API_ENDPOINT}/posts`, {
            method: 'POST',
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
            this.context.addPost(responseJson)
            this.handleAddPostClose()
        })
        .catch(err => {
            console.error(err)
        })
    }


      
      handleImageChange = (e) => {
          this.setState({
            image: URL.createObjectURL(e.target.files[0]),
            formDataImage: e.target.files[0]
          })
      }

      //need to reset input file value everytime you click the input button or else the onChnage function won't fire off because it'll be the same path technically
      resetValues = (e) => {
        e.target.value = null
      }

      handleDeleteImage = (e) => {
        this.setState({
            image: null,
            formDataImage: null
        })
    }


    render () {
        const { places } = this.context
        const { uploading, showAddForm, image } = this.state
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
                                <div className='AddPost__imageContainer'>
                                    {!image ? 
                                        null
                                    :   
                                    <>
                                        <div className='AddPost__imageCancel'>
                                            <button type='button' onClick={this.handleDeleteImage}>
                                                <span className="fas fa-times" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <label htmlFor="image" className='LoginForm__signupLabel'>
                                            <img className='EditImage__image' src={image} alt='user-icon' width='75' height='75px'/>
                                        </label>
                                    </>
                                    }
                                </div>
                                <div className='AddPost__submitContainer'>
                                    
                                    <div className='AddPost__submitDiv'>
                                        <div>
                                            <span>
                                                <i className="fas fa-image"></i>
                                                Add Photo
                                            </span>
                                        </div>
                                            <label className='AddPost__fileInputLabel'>
                                                <input className='AddPost__fileInput' type='file' id='image' name='image' onChange={this.handleImageChange} onClick={this.resetValues}/>
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

