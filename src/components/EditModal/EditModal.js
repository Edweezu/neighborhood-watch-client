import React from 'react'
import MainContext from '../../contexts/MainContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import Spinner from '../Spinner/Spinner'
import { confirmAlert } from 'react-confirm-alert'

class EditModal extends React.Component {

    static contextType = MainContext

    state = {
        image: null,
        message: '',
        post_category: '',
        subject: '',
        place_id: 1,
        show: false,
        uploading: false,
        user_logged_in: null,
        post_user: null,
        likes: 0,
        usersList: [],
        formDataImage: null,
        isMobile: true
    }


    showModal = () => {
        document.body.style.overflowY = 'hidden'
        this.setState({
            show: true
        })
    }

    hideModal = () => {
        const { isMobile } = this.state

        if (isMobile) {
            document.body.style.overflowY = 'auto'
        } else {
            document.body.style.overflowY = 'hidden'
        }

        this.setState({
            show: false,
            uploading: false
        }, () => window.location.reload())
    }

    overflowCheck = () => {
        let currentWidth = (window.innerWidth < 768)

        if (currentWidth !== this.state.isMobile) {
            this.setState({
                isMobile: currentWidth
            })
        }
    }

    componentDidMount () {
        const { postid } = this.props

        window.addEventListener('overflow', this.overflowCheck)
        this.overflowCheck()

        Promise.all([
            fetch(`${config.API_ENDPOINT}/posts/${postid}/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),

            fetch(`${config.API_ENDPOINT}/posts/${postid}/likes`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                },
            })
        ])
        .then(([totalLikesRes, usersListRes]) => {
            if (!totalLikesRes.ok) {
                return totalLikesRes.json().then(e => Promise.reject(e))
            }
            if (!usersListRes.ok) {
                return usersListRes.json().then(e => Promise.reject(e))
            }

            return Promise.all([
                totalLikesRes.json(),
                usersListRes.json()
            ])
        })
        .then(([totalLikesResJson, usersListResJson]) => {
            this.setState({
                image: totalLikesResJson.image,
                message: totalLikesResJson.message,
                post_category: totalLikesResJson.post_category,
                subject: totalLikesResJson.subject,
                place_id: totalLikesResJson.place_id,
                user_logged_in: totalLikesResJson.user_logged_in,
                post_user: totalLikesResJson.user.id,
                likes: totalLikesResJson.likes,
                usersList: usersListResJson
            })
        })  
        .catch(err => {
            console.error(err)
        })
    }

    handleLike = () => {
        let { postid } = this.props
        let { likes, usersList, user_logged_in } = this.state
        let newBody = {}
        let whoLiked = {}

        let usersFilter = () => {
            return usersList.filter(user => {
                return user.user_id === user_logged_in
            }).length
        }

        if (usersFilter()) {
            newBody = {
                likes: likes - 1
            }  
        } else {
            newBody = {
                likes: likes + 1
            }
        }

        if (newBody.likes < 0 ) {
            newBody.likes = 0
        }

        whoLiked.action = (usersFilter().length ? 'like': 'unlike')

        //if logged in user is contained in users array, then don't patch or post user in likes route
        if (usersFilter()) {
            Promise.all([
                fetch(`${config.API_ENDPOINT}/posts/${postid}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(newBody)
                }),
    
                fetch(`${config.API_ENDPOINT}/posts/${postid}/likes`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                })
            ])
            .then(([totalLikesRes, whoLikedRes]) => {
                if (!totalLikesRes.ok) {
                    return totalLikesRes.json().then(e => Promise.reject(e))
                }
    
                if (!whoLikedRes.ok) {
                    return whoLikedRes.json().then(e => Promise.reject(e))
                }
    
                return Promise.all([
                    totalLikesRes.json(),
                    whoLikedRes.json()
                ])
            })
            .then(([totalLikesResJson, whoLikedResJson]) => {
                this.setState({
                    likes: totalLikesResJson.likes,
                    usersList: whoLikedResJson
                })
            })
            .catch(err => {
                console.error(err)
            })
        } else {
            Promise.all([
                fetch(`${config.API_ENDPOINT}/posts/${postid}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(newBody)
                }),
    
                fetch(`${config.API_ENDPOINT}/posts/${postid}/likes`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(whoLiked)
                })
            ])
            .then(([totalLikesRes, whoLikedRes]) => {
                if (!totalLikesRes.ok) {
                    return totalLikesRes.json().then(e => Promise.reject(e))
                }
    
                if (!whoLikedRes.ok) {
                    return whoLikedRes.json().then(e => Promise.reject(e))
                }
    
                return Promise.all([
                    totalLikesRes.json(),
                    whoLikedRes.json()
                ])
            })
            .then(([totalLikesResJson, whoLikedResJson]) => {
                this.setState({
                    likes: totalLikesResJson.likes,
                    usersList: whoLikedResJson
                })
            })
            .catch(err => {
                console.error(err)
            })
        } 
    }

    componentWillUnmount () {
        window.removeEventListener('overflow', this.overflowCheck)
    }

    handleDeletePost = () => {
        let { postid } = this.props

        return fetch(`${config.API_ENDPOINT}/posts/${postid}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
        })
        .then(resp => {
            this.context.deletePost(postid)
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleDeleteForm = () => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick : () => {
                        this.handleDeletePost()
                    }
                },
                {
                    label: 'No',
                    onClick : () => {
                        this.setState({
                            error: null
                        })
                    }
                }
            ]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let { postid } = this.props
        let { message, post_category, subject, place_id } = this.state

        this.setState({
            uploading: true
        })

        let formData = new FormData()

        formData.append('image', e.target['image'].files[0])
        formData.append('message', message)
        formData.append('post_category', post_category)
        formData.append('subject', subject)
        formData.append('place_id', place_id)

        return fetch(`${config.API_ENDPOINT}/posts/${postid}`, {
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
            this.context.updatePost(responseJson)
            this.hideModal()
        })

    }

    handlePlaceChange = (e) => {
        this.setState({
            place_id: e.target.value
        })
    }
    
    handleCategoryChange = (e) => {
        this.setState({
            post_category: e.target.value
        })
    }

    handleMessageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSubjectChange = (e) => {
        this.setState({
            subject: e.target.value
        })
    }

    resetValues = (e) => {
      e.target.value = null
    }

    handleDeleteImage = (e) => {
      this.setState({
          image: null,
          formDataImage: null
      })
    }

    handleImageChange = (e) => {
        this.setState({
            image: URL.createObjectURL(e.target.files[0]),
            formDataImage: e.target.files[0]
        })
    }

    render () {
        const { places=[] } = this.context
        const { number_of_comments } = this.props
        const { message, post_category, subject, place_id, show, uploading, user_logged_in, post_user, likes, usersList, image, isMobile } = this.state
        const showHideClassName = show ? 'modal display-block' : 'modal display-none'

        console.log("is mobile", isMobile)

        return (
            <section className='EditModal'>
                {uploading ? 
                <div className={showHideClassName}>
                        <Spinner />
                </div> : (
                    <div className={showHideClassName}>    
                    <section className='modal-main'>
                        
                        <form className='EditModal__form' onSubmit={this.handleSubmit}>
                            <div className='closeModalDiv'>
                                <button type='button' onClick={this.hideModal}>
                                    <span className="fas fa-times" aria-hidden="true"></span>
                                </button>
                            </div>
                            <div className='AddPost__formContainer'>
                                <div className='LoginForm__signupElement modalSelect'>
                                    <div className='LoginForm__signupLabel'>
                                        <label htmlFor='browse_cities' className='LoginForm__signupLabel'>Active Page</label>
                                    </div>
                                    <div className='LoginForm__signupLabel selectModalDiv'>
                                        <select id='browse_cities' value={place_id} onChange={this.handlePlaceChange}required>
                                            {places.map(place => {
                                                return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='LoginForm__signupElement modalSelect'>
                                    <div className='LoginForm__signupLabel'>
                                        <label htmlFor='post_category' className='LoginForm__signupLabel'>Category</label>
                                    </div>
                                    <div className='LoginForm__signupLabel selectModalDiv'>
                                        <select id='post_category' value={post_category} onChange={this.handleCategoryChange} required>
                                            <option value='Crime and Alerts'>Crime and Alerts </option>
                                            <option value='Upcoming Events'>Upcoming Events </option>
                                            <option value='Lost and Found'>Lost and Found</option>
                                        </select>  
                                    </div>           
                                </div>
                            </div>
                            <div className='LoginForm__signupElement'>
                                    <div className='LoginForm__signupLabel'>
                                        <label htmlFor='subject' className='LoginForm__signupLabel'>Subject</label>
                                    </div>
                                    <div className='LoginForm__signupLabel subjectLabel'>
                                        <input type='text' id='subject' name='subject' required value={subject} onChange={this.handleSubjectChange}></input>
                                    </div>
                            </div>
                            <div className='LoginForm__signupElement'>
                                <div className='LoginForm__signupLabel'>
                                    <label htmlFor="message" className='LoginForm__signupLabel'>Message</label>
                                </div>
                                <div className='LoginForm__signupLabel'>
                                    <textarea type='text' id='message' name='message' value={message} onChange={this.handleMessageChange} required></textarea>
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
                <div className='EditModal__buttonsDiv'>
                    <div>   
                        {user_logged_in === post_user ? (
                            <div className='btn-div'>
                                <i onClick={this.showModal} className="far fa-edit"></i>
                                <i onClick={this.handleDeleteForm} className="fas fa-trash-alt"></i>
                            </div> 
                        ) : null}                     
                    </div>
                    <div className='EditModal__likesDiv'>
                        {(usersList.filter(user => user.user_id === user_logged_in).length) ? 
                        (<button className='Post__likeButton heartColor' type='button' onClick={this.handleLike}><i className="fas fa-heart heartColor"></i>{likes > 0 ? likes : null}</button>) :
                        (<button className='Post__likeButton' type='button' onClick={this.handleLike}><i className="far fa-heart"></i>{likes > 0 ? likes : null}</button>) }
                        
                        <span className='Post__commentContainer'>
                            <i className="far fa-comment"></i>
                            <span className='Post__commentNumber'>{number_of_comments}</span>
                        </span>
                    </div>                  
                </div>
            </section>
        )
    }
}

export default EditModal