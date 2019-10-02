import React from 'react'
import { findPost, findUser, findCommentUser, findComments } from '../../helpers'
import { Link } from 'react-router-dom'
import fileImage from '../../app-images/file-image-icon.png'
import MainContext from '../../contexts/MainContext';
import CommentTextBox from '../../components/CommentTextBox/CommentTextBox'
import Footer from '../../components/Footer/Footer'
import config from '../../config'

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


    errorHandler = () => {
        const { error } = this.state
        if (error) {
            if (error == `Post does not exist`) {
                return <p className='error'><strong>Error! Post does not exist</strong></p>
            } else {
                return <p className='error'><strong>Error! You have been logged out. Please log back in to continue.</strong></p>
            }
        }
    }

    nameCapitalized = (name) => {
        if (!name) {
            return null
        }
        return name.charAt(0).toUpperCase() + name.slice(1) 
    }

    render () {

        const { posts, comments } = this.context
        
        const { postId } = this.props.match.params
        const post = findPost(posts, postId) || {}
        post.user = post.user || {}
        // const user = findUser(users, post.user_id) || {}
        // const commentUser = findCommentUser(users, post.user_id) || {}
        const correctComments = findComments(comments, postId) || []

       

        console.log('posts', posts)
        console.log('post', post)
        console.log('comments', comments)
        console.log('postid', postId)
        console.log('correct comment', correctComments)

        

        return (
            <section>
                <section>
                    {this.errorHandler}
                </section>
                <section className='PostPage'>
                    <div className='back-btn'>
                        <button type='button' onClick={() => this.props.history.goBack()}>Go Back</button>
                    </div>
                    <section className='PostPage__postContainer'>
                        <div className='PostPage__userInfo'>
                            {this.nameCapitalized(post.user.username)}, {post.user.city}
                        </div>
                        <div>
                            <h4><Link to={`/post-page/${postId}`}>{post.subject}</Link></h4>
                            <p>{post.message}</p>
                            <figure>
                                <img src={fileImage} alt='default icon' width='100'/>
                                <figcaption>User uploaded image is going to replace this.</figcaption> 
                            </figure>
                            <div>
                                <p>Posted on {post.date_created}</p>
                                <button type='button'><i className="fas fa-thumbs-up"></i></button>
                                {/* <button type='button'><i className="fas fa-thumbs-down"></i></button> */}
                            </div>
                        </div>
                    </section>
                    <section className='PostPage__comments'>
                        <ul className='PostPage__commentList'>
                            {correctComments.map(comment => {
                                return (<li key={comment.id}>
                                <p>
                                {this.nameCapitalized(comment.user.username)}, {comment.user.city}
                                </p>
                                <p>{comment.text}</p>
                                <p>{comment.date_created}</p>
                                <button type='button'>
                                    Edit
                                </button>
                                <button type='button'>
                                    Delete
                                </button>    
                            </li>)
                            } 
                            )}
                        </ul>
                        <CommentTextBox 
                            postId ={postId}
                        />
                    </section>
                    
                </section>
                <Footer />
            </section>   
        )
    }
}

export default PostPage