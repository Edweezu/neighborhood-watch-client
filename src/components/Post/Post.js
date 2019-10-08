import React from 'react'
// import { findUser } from '../../helpers'
import MainContext from '../../contexts/MainContext';
import fileImage from '../../app-images/file-image-icon.png'
import { Link } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditModal from '../EditModal/EditModal'

class Post extends React.Component {

    static contextType = MainContext

    state = {
        show: false
    }

    showModal = () => {
        this.setState({
            show: true
        })
    }

    hideModal = () => {
        this.setState({
            show: false
        })
    }

    handleDeletePost = () => {

        //forgot you can just take postid from props in any function in the component. don't need to pass it into the function
        let { id } = this.props

        return fetch(`${config.API_ENDPOINT}/posts/${id}`, {
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
            this.context.deletePost(id)
            //reset state with updated posts, one less post
            // window.location.reload()
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

    render () {
        // const { users=[] } = this.context
        const { id, subject, message, date_created, user, image } = this.props
        // const user = findUser(users, user_id) || []
        
        // console.log('users', users)
        // console.log('user id', user_id)
        // console.log('user', user)

        const nameCapitalized = user.username.charAt(0).toUpperCase() + user.username.slice(1)

        return (
            <section className='Post'>
                <div className='Post__userInfo'>
                    {nameCapitalized}, {user.city}
                </div>
                <div>
                    <h4><Link to={`/post-page/${id}`}>{subject}</Link></h4>
                    <p>{message}</p>
                    {image ? (
                        <figure>
                        <img src={image} alt='default icon' width='100'/>
                        <figcaption>User uploaded image is going to replace this.</figcaption> 
                        </figure>
                    ): null}
                    <div>
                        <p>Posted on {date_created}
                        </p>
                        <EditModal
                            show={this.state.show}
                            hideModal={this.hideModal}
                        />
                        <button type='button' onClick={this.showModal}>
                            Edit
                        </button>
                        <button type='button' onClick={this.handleDeleteForm}>
                            Delete
                        </button>      
                    </div>
                    <div>
                        <button type='button'><i className="fas fa-thumbs-up"></i></button>
                    </div>
                </div>

            </section>
        )
    }
}

export default Post