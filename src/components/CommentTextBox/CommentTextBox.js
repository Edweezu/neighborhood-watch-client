import React from 'react'
import MainContext from '../../contexts/MainContext';
import config from '../../config'
import TokenService from '../../services/token-service'

class CommentTextBox extends React.Component {
    static contextType = MainContext

    handleSubmit = (e) => {
        e.preventDefault()
        const { postId, addNumComment } = this.props
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
            console.log('intial res', res)
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            //forgot how to erase the value
            console.log('comment responsejson', responseJson)
            text.value = ''
            this.context.addComment(responseJson)
            addNumComment()
        })
        .catch(err => {
            console.error(err)
        })


    }

    render () {
        return (
            <form  onSubmit={this.handleSubmit}className='CommentTextBox'>
                <div className='CommentTextBox__container'>
                    <textarea
                        required
                        className='CommentTextBox__textArea'
                        aria-label='Type a comment...'
                        name='CommentTextBox__text'
                        id='CommentTextBox__text'
                        cols='30'
                        rows='5'
                        placeholder='Type a comment...'
                    >
                    </textarea>
                   
                    <div className='CommentTextBox__buttonDiv'>
                         <button className='btn' type='submit'>Comment</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CommentTextBox

