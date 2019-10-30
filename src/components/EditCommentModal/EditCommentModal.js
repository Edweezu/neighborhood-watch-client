import React from 'react'
import MainContext from '../../contexts/MainContext'
import TokenService from '../../services/token-service'
import config from '../../config'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Spinner from '../Spinner/Spinner'

class EditCommentModal extends React.Component {

    static contextType = MainContext

    state = {
        text: '',
        uploading: false,
        showCommentForm : false,
        user_logged_in : null,
        comment_user: null
    }

    componentDidMount () {
        let {commentId } = this.props

        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            this.setState({
                text: responseJson.text,
                user_logged_in: responseJson.user_logged_in,
                comment_user: responseJson.user_id
            })
        })   
    }   

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            uploading: true
        })

        let { commentId } = this.props
        let { text } = this.state
        let newComment = {
            text
        }

        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newComment)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            this.context.updateComment(responseJson)
            this.hideCommentModal()
        })
    }

    showCommentModal = () => {
        document.body.style.overflowY = 'hidden'
        this.setState({
            showCommentForm: true
        })
    }

    hideCommentModal = () => {
        document.body.style.overflowY = 'auto'
        this.setState({
            showCommentForm: false,
            uploading: false
        })
    }

    handleDeleteComment = () => {
        const { commentId, deleteNumComment } = this.props

        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
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
        .then(data => {
            this.context.deleteComment(commentId)
            deleteNumComment()
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
                        this.handleDeleteComment()
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

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render () {
        const { uploading, showCommentForm, text, comment_user, user_logged_in } = this.state

        return (
            <section>
                {uploading ? (
                    <div>
                        <Spinner />
                    </div>
                ) : (
                    <div>
                         {showCommentForm ? (
                            <div className='modal display-block'>
                                <section className='modal-mainTwo'>
                                    <form className='EditModal__form' onSubmit={this.handleSubmit}>
                                        <div className='closeModalDiv'>
                                            <button type='button' onClick={this.hideCommentModal}>
                                                <span className="fas fa-times" aria-hidden="true"></span>
                                            </button> 
                                        </div>
                                        <div className='LoginForm__signupElement modalSelect'>
                                            <div className='LoginForm__signupLabel'>
                                                <label htmlFor='comment_text' className='LoginForm__signupLabel'>Updated Comment</label>
                                            </div>
                                            <div className='LoginForm__signupLabel subjectLabel'>
                                                <input type='text' id='comment_text' name='comment_text' value={text} onChange={this.handleTextChange}/>
                                            </div>
                                        </div>
                                        <button className='btn' type='submit'>Submit</button>
                                    </form>
                                </section> 
                            </div>
                         ) : null}
                    </div>
                )}
                {user_logged_in === comment_user ? (
                    <div className='Comment__btn-div'>
                             <i onClick={this.showCommentModal} className="far fa-edit"></i>
                             <i onClick={this.handleDeleteForm} className="fas fa-trash-alt"></i>
                    </div> 
                ) : null}
            </section>
        )
    }
}

export default EditCommentModal