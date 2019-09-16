import React from 'react'
import MainContext from '../../contexts/MainContext';


class CommentTextBox extends React.Component {
    static contextType = MainContext

    render () {
        return (
            <form className='CommentTextBox'>
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