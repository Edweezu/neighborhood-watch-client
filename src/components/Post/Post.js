import React from 'react'
import { findUser } from '../../helpers'
import MainContext from '../../contexts/MainContext';
import fileImage from '../../app-images/file-image-icon.png'
import { Link } from 'react-router-dom'


class Post extends React.Component {

    static contextType = MainContext

    render () {
        const { users=[] } = this.context
        const { id, subject, message, date_created, user_id } = this.props
        const user = findUser(users, user_id) || []
        // console.log('users', users)
        // console.log('user id', user_id)
        // console.log('user', user)
        return (
            <section className='Post'>
                <div className='Post__userInfo'>
                    {user.username}, {user.city}
                </div>
                <div>
                    <h4><Link to={`/post-page/${id}`}>{subject}</Link></h4>
                    <p>{message}</p>
                    <figure>
                        <img src={fileImage} alt='default icon' width='100'/>
                        <figcaption>User uploaded image is going to replace this.</figcaption> 
                    </figure>
                    <div>
                        <p>Posted on {date_created}
                        </p>
                        <button type='button'>
                            Edit
                        </button>
                        <button type='button'>
                            Delete
                        </button>      
                    </div>
                    <div>
                        <button type='button'><i className="fas fa-thumbs-up"></i></button>
                        <button type='button'><i className="fas fa-thumbs-down"></i></button>
                    </div>
                </div>

            </section>
        )
    }
}

export default Post