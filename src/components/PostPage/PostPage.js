import React from 'react'
import { findPost, findUser } from '../../helpers'
import { Link } from 'react-router-dom'
import fileImage from '../../app-images/file-image-icon.png'
import MainContext from '../../contexts/MainContext';

//NotePageMain
class PostPage extends React.Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }

    static contextType = MainContext

    render () {

        const { posts, users } = this.context
        const { postId } = this.props.match.params
        const post = findPost(posts, postId) || {}
        const user = findUser(users, post.user_id) || {}
        console.log('posts', posts)
        console.log('post', post)

        return (
            <section className='PostPage'>
                <div className='back-btn'>
                    <button type='button' onClick={() => this.props.history.goBack()}>Go Back</button>
                </div>

                <div className='Post__userInfo'>
                    {user.username}, {user.city}
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
                        <button type='button'><i className="fas fa-thumbs-down"></i></button>
                    </div>
                </div>
            </section>
        )
    }
}

export default PostPage