import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import MainContext from '../../contexts/MainContext'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; 


class Comment extends React.Component {

    static contextType = MainContext    

    handleDeleteComment = () => {
        const { id } = this.props

        return fetch(`${config.API_ENDPOINT}/comments/${id}`, {
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
            this.context.deleteComment(id)
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


    render () {

        const { user, text, date_created, nameCapitalized } = this.props

        return (
            <section>
                <p>
                    {nameCapitalized(user.username)}, {user.city}
                    </p>
                    <p>{text}</p>
                    <p>{date_created}</p>
                    <button type='button'>
                        Edit
                    </button>
                    <button type='button' onClick={this.handleDeleteForm}>
                        Delete
                    </button>
            </section>
        )
    }
}

export default Comment