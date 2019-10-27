import React from 'react'
import { findPost, findComments } from '../../helpers'
import { Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext';
import CommentTextBox from '../../components/CommentTextBox/CommentTextBox'
import Footer from '../../components/Footer/Footer'
import config from '../../config'   
import TokenService from '../../services/token-service'
import Comment from '../../components/Comment/Comment'
import moment from 'moment'
import Spinner from '../../components/Spinner/Spinner'


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
          number_of_comments: null
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

        // let formattedDate = moment(post.date_created, 'ddd MMM DD YYYY HH:mm:ss ZZ').format("YYYYMMDD")
        let niceDate = moment(post.date_created, 'ddd MMM DD YYYY HH:mm:ss ZZ').format("MMM DD, YYYY")

        //how to change from provided server UTC time to local time so calculations are correct
        let daysAgo = moment.utc(post.date_created).local().fromNow()

        let todayUnix = moment().unix()
        
        let dateUnix = moment(new Date(post.date_created)).unix()
        //need to divide unix time by 86400 seconds in a day to find day diff
        let dateDiff = (todayUnix - dateUnix)/86400

        // console.log('date diff', dateDiff)
        if (dateDiff > 6) {
            return `Posted on ${niceDate}`
        } else {
            return `Posted ${daysAgo}`
        }
    } 

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handlePlaceChange = (e) => {
        this.setState({
            //only need e.target.value here because this function is already located inside the event target
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
        let { message, post_category, subject, place_id } = this.state

        this.setState({
            uploading: true
        })

        console.log('event target', e.target['image'].files[0])

        let formData = new FormData()

        formData.append('image', e.target['image'].files[0])
        formData.append('message', message)
        formData.append('post_category', post_category)
        formData.append('subject', subject)
        formData.append('place_id', place_id)

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
             console.log('patch responsejson', responseJson)
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
        // console.log('invoked')
        let { number_of_comments } = this.state
        this.setState({
            number_of_comments: parseInt(number_of_comments) + 1
        })
    }

    deleteNumComment = () => {
        console.log('invoked')
        let { number_of_comments } = this.state
        this.setState({
            number_of_comments: parseInt(number_of_comments) - 1
        })
    }
   

    render () {

        const { posts, comments=[], places } = this.context
        const { uploading, show, subject, message, post_category, place_id, number_of_comments } = this.state
        
        const { postId } = this.props.match.params
        const post = findPost(posts, postId) || {}
        post.user = post.user || {}
        // const user = findUser(users, post.user_id) || {}
        // const commentUser = findCommentUser(users, post.user_id) || {}
        const correctComments = findComments(comments, postId) || []
        const showHideClassName = show ? 'modal display-block' : 'modal display-none'
       
        // console.log('post', post)
        // console.log('places', places)
        // console.log('posts', posts)
        console.log('post', post)
        // console.log('comments', comments)
        // console.log('postid', postId)
        // console.log('correct comment', correctComments)
        // console.log("error", this.state.error)
        // console.log('post page state', this.state)

        

        return (
            <section>
                {(post.hasOwnProperty('message')) ? (<section className='PostPage' id='PostPage__top'>
                    
                    <section className='PostPage__postContainer'>
                        <div className='back-btn'>
                                    {/* <button type='button' onClick={this.goBack}>Go Back</button> */}
                                    <a href='/category/1'><i className="fas fa-arrow-left"></i></a>
                                    
                        </div>
                        {/* <div className='PostPage__header'>
                            <h4><Link to={`/post-page/${postId}`}>{post.subject}</Link></h4>
                        </div> */}
                        <div className='Post__userInfo'>
                            {this.postCategoryIcon()} {this.nameCapitalized(post.user.username)}, {post.user.city}
                        </div>
                        <div>
                            <div className='Post__body'> 
                                <h4><Link to={`/post-page/${postId}`}>{post.subject}</Link></h4>
                                <p>{post.message}</p>
                                <img src={post.image} alt='default icon' className={ post.image ? null : 'display-none'}/>
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
                                                <button type='button' onClick={this.hideModal}>
                                                    <span className="fas fa-times" aria-hidden="true"></span>
                                                </button>
                                                <div className='AddPost__formContainer'>
                                                    <div className='AddPost__formDiv'>
                                                        <label htmlFor='browse_cities'>Active Page</label>
                                                        <select id='browse_cities' value={place_id} onChange={this.handlePlaceChange} required>
                                                            {places.map(place => {
                                                                return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className='AddPost__formDiv'>
                                                        <label htmlFor='post_category'>Category</label>
                                                        <select id='post_category' value={post_category} onChange={this.handleCategoryChange} required>
                                                            <option value='Crime and Alerts'>Crime and Safety </option>
                                                            <option value='Upcoming Events'>Upcoming Events </option>
                                                            <option value='Lost and Found'>Lost and Found</option>
                                                        </select>  
                                                    </div>
                                                    <div className='AddPost__formDiv'>
                                                        <label htmlFor='subject'>Subject</label>
                                                        <input type='text' id='subject' name='subject' required value={subject} onChange={this.handleSubjectChange}></input>
                                                    </div>
                                                </div>
                                                <div className='messageAdd'>
                                                    <label htmlFor='message'>Message</label>
                                                    <input type='text' id='message' name='message' value={message} onChange={this.handleMessageChange} required></input>
                                                </div>
                                                <div className='AddPost__formContainer'>
                                                    <div className='AddPost__formDiv'>
                                                            <input type='file' id='image' name='image' onChange={this.handleImageChange} />
                                                    </div>
                                                    {/* <a href='#' type="submit">Submit</a> */}
                                                    <button type='submit'>Submit</button>
                                                </div>
                                            </form>
                                        </section>
                                    </div>
                                )}
                                {/* <button type='button'><i className="fas fa-thumbs-up"></i></button> */}
                                {/* <button type='button'><i className="fas fa-thumbs-down"></i></button> */}
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
                            </li>)
                            } 
                            )}
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
                        {/* <button type='button' onClick={this.goBack}>Go Back</button> */}
                        <a href='/category/1'>Go Back</a>
                    </div>
                    <p className='error'>
                        <strong>Error! Post does not exist</strong>
                    </p>
                </section>
               }
                <Footer />
            </section>   
        )
    }
}

export default PostPage