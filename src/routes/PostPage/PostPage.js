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
          error: null
      }

    static contextType = MainContext

    nameCapitalized = (name) => {
        if (!name) {
            return null
        }
        return name.charAt(0).toUpperCase() + name.slice(1) 
    }

    componentDidMount () {
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
        ])
        .then(([postsRes, commentsRes]) => {
            if (!postsRes.ok) {
                return postsRes.json().then(e => Promise.reject(e))
            }
      
            if (!commentsRes.ok) {
                return commentsRes.json().then(e => Promise.reject(e))
            }
      
            return Promise.all([
                postsRes.json(),
                commentsRes.json()
            ])
        })
        .then(([postsRespJson, commentsRespJson]) => {
             this.context.setPosts(postsRespJson)
             this.context.setComments(commentsRespJson)
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


   

    render () {

        const { posts, comments } = this.context
        
        const { postId } = this.props.match.params
        const post = findPost(posts, postId) || {}
        post.user = post.user || {}
        // const user = findUser(users, post.user_id) || {}
        // const commentUser = findCommentUser(users, post.user_id) || {}
        const correctComments = findComments(comments, postId) || []

       

        // console.log('posts', posts)
        // console.log('post', post)
        console.log('comments', comments)
        // console.log('postid', postId)
        // console.log('correct comment', correctComments)
        // console.log("error", this.state.error)

        

        return (
            <section>
                {(post.hasOwnProperty('message')) ? (<section className='PostPage'>
                    <div className='back-btn'>
                        {/* <button type='button' onClick={this.goBack}>Go Back</button> */}
                        <a href='/category/1'>Go Back</a>
                    </div>
                    <section className='PostPage__postContainer'>
                        <div className='PostPage__userInfo'>
                            {this.nameCapitalized(post.user.username)}, {post.user.city}
                        </div>
                        <div>
                            <h4><Link to={`/post-page/${postId}`}>{post.subject}</Link></h4>
                            <p>{post.message}</p>
                            <figure className={ post.image ? null : 'display-none'}>
                                <img src={post.image} alt='default icon' width='100'/>
                            </figure>
                            <div>
                                <p>{this.dateDiff()}</p>
                                <button type='button'><i className="fas fa-thumbs-up"></i></button>
                                {/* <button type='button'><i className="fas fa-thumbs-down"></i></button> */}
                            </div>
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
                                />
                            </li>)
                            } 
                            )}
                        </ul>
                        <CommentTextBox 
                            postId ={postId}
                        />
                    </section>
                    
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