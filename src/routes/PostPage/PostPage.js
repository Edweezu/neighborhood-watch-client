import React from 'react'
import { findPost, findComments } from '../../helpers'
import { Link, NavLink } from 'react-router-dom'
import MainContext from '../../contexts/MainContext';
import CommentTextBox from '../../components/CommentTextBox/CommentTextBox'
import config from '../../config'   
import TokenService from '../../services/token-service'
import Comment from '../../components/Comment/Comment'
import moment from 'moment'
import Spinner from '../../components/Spinner/Spinner'
import Nav from '../../components/Nav/Nav'

class PostPage extends React.Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }

      state = {
          error: null,
          image: null,
          message: '',
          post_category: '',
          subject: '',
          place_id: 1,
          show: false,
          uploading: false,
          number_of_comments: null,
          formDataImage: null
      }

    static contextType = MainContext

    nameCapitalized = (name) => {
        if (!name) {
            return null
        }
        return name.charAt(0).toUpperCase() + name.slice(1) 
    }

    componentDidMount () {
        const { postId } = this.props.match.params
        document.body.style.overflowY = 'auto'

        Promise.all([
            fetch(`${config.API_ENDPOINT}/posts`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),

            fetch(`${config.API_ENDPOINT}/comments`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),
        
            fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),

            fetch(`${config.API_ENDPOINT}/places`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            })
        ])
        .then(([postsRes, commentsRes, postRes, placesRes]) => {
            if (!postsRes.ok) {
                return postsRes.json().then(e => Promise.reject(e))
            }
      
            if (!commentsRes.ok) {
                return commentsRes.json().then(e => Promise.reject(e))
            }
            if (!postRes.ok) {
                return postRes.json().then(e => Promise.reject(e))
            }
      
            if (!placesRes.ok) {
                return placesRes.json().then(e => Promise.reject(e))
            }
      
            return Promise.all([
                postsRes.json(),
                commentsRes.json(),
                postRes.json(),
                placesRes.json(),
            ])
        })
        .then(([postsRespJson, commentsRespJson, postRes, placesRes]) => {
             this.context.setPosts(postsRespJson)
             this.context.setComments(commentsRespJson)
             this.setState({
                image: postRes.image,
                message: postRes.message,
                post_category: postRes.post_category,
                subject: postRes.subject,
                place_id: postRes.place_id,
                number_of_comments: postRes.number_of_comments
             })
             this.context.setPlaces(placesRes)
        })
        .catch(error => {
            this.setState({
                error
            })
        })
    }

    dateDiff = () => {
        const { posts } = this.context       
        const { postId } = this.props.match.params
        const post = findPost(posts, postId) || {}

        let niceDate = moment(post.date_created, 'ddd MMM DD YYYY HH:mm:ss ZZ').format("MMM DD, YYYY")
        let daysAgo = moment.utc(post.date_created).local().fromNow()
        let todayUnix = moment().unix()
        
        let dateUnix = moment(new Date(post.date_created)).unix()
        let dateDiff = (todayUnix - dateUnix)/86400

        if (dateDiff > 6) {
            return `Posted on ${niceDate}`
        } else {
            return `Posted ${daysAgo}`
        }
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

    showModal = () => {
        document.body.style.overflowY = 'hidden'
        this.setState({
            show: true
        })
    }

    hideModal = () => {
        document.body.style.overflowY = 'auto'
        this.setState({
            show: false,
            uploading: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let { postId } = this.props.match.params
        let { message, post_category, subject, place_id, image, formDataImage } = this.state

        this.setState({
            uploading: true
        })

        let formData = new FormData()

        if (image && !formDataImage) {
            formData.append('message', message)
            formData.append('post_category', post_category)
            formData.append('subject', subject)
            formData.append('place_id', place_id)
        } else if (image && formDataImage) {
            formData.append('message', message)
            formData.append('post_category', post_category)
            formData.append('subject', subject)
            formData.append('place_id', place_id)
            formData.append('image', formDataImage)
        } else {
            formData.append('message', message)
            formData.append('post_category', post_category)
            formData.append('subject', subject)
            formData.append('place_id', place_id)
            formData.append('image', undefined)
        }

        return fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
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

    postCategoryIcon = () => {
        let { post_category } = this.state

        if (post_category === 'Crime and Alerts') {
            return <i className="fas fa-exclamation-triangle"></i>
        } else if (post_category === 'Upcoming Events') {
            return <i className="fas fa-calendar-alt"></i>
        } else if (post_category === 'Lost and Found') {
            return <i className="fas fa-box-open"></i>
        } else {
            return null
        }
    }

    addNumComment = () => {
        let { number_of_comments } = this.state
        this.setState({
            number_of_comments: parseInt(number_of_comments) + 1
        })
    }

    deleteNumComment = () => {
        let { number_of_comments } = this.state
        this.setState({
            number_of_comments: parseInt(number_of_comments) - 1
        })
    }
   
    render () {
        const { posts, comments=[], places } = this.context
        const { uploading, show, subject, message, post_category, place_id, number_of_comments, image } = this.state
        
        const { postId } = this.props.match.params
        const post = findPost(posts, postId) || {}
        post.user = post.user || {}

        const correctComments = findComments(comments, postId) || []
        const showHideClassName = show ? 'modal display-block' : 'modal display-none'
       
        return (
            <section>
                <Nav />
                {(post.hasOwnProperty('message')) ? (<section className='PostPage' id='PostPage__top'>
                    <section className='PostPage__postContainer'>
                        <div className='back-btn'>
                            <NavLink to='/category/1'><i className="fas fa-arrow-left"></i></NavLink>        
                        </div>
                        <div className='Post__userInfo'>
                            {this.postCategoryIcon()} {this.nameCapitalized(post.user.username)}, {post.user.city}
                        </div>
                        <div>
                            <div className='Post__body'> 
                                <h4><Link to={`/post-page/${postId}`}>{post.subject}</Link></h4>
                                <p>{post.message}</p>
                                <img src={post.image} alt='default icon' className={ !post.image || post.image === 'undefined' ? 'display-none' : null}/>
                            </div>
                            <div>
                                <div className='Post__date'>
                                    <p>{this.dateDiff()}</p>
                                </div>
                                <div className='EditModal__buttonsDiv'>
                                    <div className='btn-div'>
                                        {post.user_logged_in == post.user.id ?  
                                            <i onClick={this.showModal} className="far fa-edit"></i>
                                        : null}
                                    </div>
                                    <span className='Post__commentContainer'>
                                        <i className="far fa-comment"></i>
                                        <span className='Post__commentNumber'>{number_of_comments}</span>
                                    </span>
                                </div>
                                 {uploading ? 
                                    <div>
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
                                                    {!image || image === 'undefined' ? 
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
                            </div>
                            <CommentTextBox 
                                postId ={postId}
                                addNumComment={() => this.addNumComment()}
                            />
                        </div>                  
                    </section>
                    <section className='PostPage__comments'>
                        <ul className='PostPage__commentList'>
                            {correctComments.map(comment => {
                                return (<li key={comment.id}>
                                            <Comment 
                                                id={comment.id}
                                                user={comment.user}
                                                text={comment.text}
                                                date_created={comment.date_created}
                                                nameCapitalized={this.nameCapitalized}
                                                deleteNumComment={() => this.deleteNumComment()}
                                            />
                                        </li>
                                        )
                            })}
                        </ul>    
                    </section>
                    <div className='scroll-up-div'>
                        <a href="#PostPage__top">
                            <i className="fa fa-chevron-up"></i>          
                        </a>                   
                    </div>
                </section>) : 
                <section className='PostPage'>
                    <div className='back-btn'>
                        <a href='/category/1'>Go Back</a>
                    </div>
                    <p className='error'>
                        <strong>Error! Post does not exist</strong>
                    </p>
                </section>
               }
            </section>   
        )
    }
}

export default PostPage