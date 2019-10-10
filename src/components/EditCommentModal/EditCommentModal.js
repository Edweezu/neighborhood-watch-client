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
        showCommentForm : false
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
            console.log('get response', responseJson)
            this.setState({
                text: responseJson.text
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
            console.log('submit response', responseJson)
            this.context.updateComment(responseJson)
            this.hideCommentModal()
        })
    }

    showCommentModal = () => {
        this.setState({
            showCommentForm: true
        })
    }

    hideCommentModal = () => {
        this.setState({
            showCommentForm: false,
            uploading: false
        })
    }

    handleDeleteComment = () => {
        const { commentId } = this.props

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

        const { uploading, showCommentForm, text } = this.state
        // const showHideClassName = showCommentForm ? 'modal display-block' : 'modal display-none'

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
                                <section className='modal-main'>
                                    <form onSubmit={this.handleSubmit}>
                                        <button onClick={this.hideCommentModal}>
                                        <span className="fas fa-times" aria-hidden="true"></span>
                                        </button>
                                        <div className='AddPost__formDiv'>
                                            <label htmlFor='comment_text'>Updated Comment</label>
                                            <input type='text' id='comment_text' name='comment_text' value={text} onChange={this.handleTextChange}/>
                                        </div>
                                        <button type='submit'>Submit</button>
                                    </form>
                                </section> 
                            </div>
                         ) : null}
                    </div>
                )}
                <button type='button' onClick={this.showCommentModal}>
                    Edit
                </button>
                <button type='button' onClick={this.handleDeleteForm}>
                        Delete
                </button>
            </section>
        )
    }
}

export default EditCommentModal