import React from 'react'

class AddPost extends React.Component {

    state = {
        showForm: false
    }

    handleClick = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render () {
        const { showForm } = this.state
        return (
            <section className='DashMainPosts__addPost'>
            <div>
                <button className='post_btn' type='button' onClick={this.handleClick}>Create Post</button>
            </div>
            {showForm ? (
            <form>
            <div>
                <label htmlFor='category'>Category</label>
                <select id='category'>
                    <option value='crime'>Crime and Safety </option>
                    <option value='events'>Upcoming Events </option>
                    <option value='lost'>Lost and Found</option>
                </select> 
            </div>
            <div>
                <label htmlFor='subject'>Subject</label>
                <input type='text' id='subject' name='subject'></input>
            </div>
            <div>
                <label htmlFor='message'>Message</label>
                <textarea id='message' name='message' rows='5' cols='30'>
                </textarea>
            </div>
            <div>
                <input type='file'/>
            </div>
            <button type='submit'>Submit</button>
            </form>

    ) : null}
     </section>
        )    
    }
}

export default AddPost