import React from 'react'
import MainContext from '../../contexts/MainContext';
import config from '../../config'
import TokenService from '../../services/token-service'

class CommentTextBox extends React.Component {
    static contextType = MainContext

    handleSubmit = (e) => {
        e.preventDefault()
        const { postId } = this.props
        //forgot this
        const text = e.target['CommentTextBox__text']

        const newComment = {
            text: text.value,
            post_id: postId
        }
       
        return fetch(`${config.API_ENDPOINT}/comments`, {
            method: 'POST',
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
            //forgot how to erase the value
            text.value = ''
            this.context.addComment(responseJson)
        })
        .catch(err => {
            console.error(err)
        })


    }

    render () {
        return (
            <form  onSubmit={this.handleSubmit}className='CommentTextBox'>
                <div>
                    <textarea
                        required 
                        aria-label='Type a comment...'
                        name='CommentTextBox__text'
                        id='CommentTextBox__text'
                        cols='30'
                        rows='3'
                        placeholder='Type a comment...'
                    >
                    </textarea>
                    <div>
                        <button type='submit'>Post Comment</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CommentTextBox