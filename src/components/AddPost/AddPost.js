import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

class AddPost extends React.Component {

    state = {
        showForm: false
    }

    // handleClick = () => {
    //     this.setState({
    //         showForm: !this.state.showForm
    //     })
    // }

    handleSubmitForm = () => {
        this.setState({
            showForm: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let { subject, message, post_category } = e.target

        let newPost = {
            subject: subject.value,
            message: message.value,
            post_category: post_category.value,
            date_created: new Date(),
        }

        console.log('newpost', newPost)

        return fetch(`${config.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
           body: JSON.stringify(newPost)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            subject.value = ''
            message.value = ''
            // this.handleSubmitForm()
            this.context.addPost(responseJson)
        })
        .catch(err => {
            console.error(err)
        })

    }


    render () {
        // const { showForm } = this.state
        return (
            <section className='AddPost'>
                <div>
                    {/* <button className='post_btn' type='button' onClick={this.handleClick}>Create Post</button> */}
                    <a href='#createPostForm' className='post_btn'>Create Post</a>
                </div>
                <div id='createPostForm' className='AddPost__form'>
                    <form onSubmit={this.handleSubmit}>
                        <a href='#' className='cancelForm'><span className="fas fa-times" aria-hidden="true"></span></a>
                        <div className='AddPost__formContainer'>
                            <div className='AddPost__formDiv'>
                                <label htmlFor='post_category'>Category</label>
                                <select id='post_category'>
                                    <option value='crime'>Crime and Safety </option>
                                    <option value='events'>Upcoming Events </option>
                                    <option value='lost'>Lost and Found</option>
                                </select> 
                            </div>
                            <div className='AddPost__formDiv'>
                                <label htmlFor='subject'>Subject</label>
                                <input type='text' id='subject' name='subject'></input>
                            </div>
                        </div>
                        <div className='messageAdd'>
                            <label htmlFor='message'>Message</label>
                            {/* <textarea id='message' name='message' rows='5' cols='30'>
                            </textarea> */}
                            <input type='text' id='message' name='message'></input>
                        </div>
                        <div className='AddPost__formContainer'>
                            <div className='AddPost__formDiv'>
                                    <input type='file'/>
                                </div>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
                <div id='AddPost__cover'></div>        
            </section>
        )    
    }
}

export default AddPost

// {showForm ? (
//     <form className='AddPost__form'>
//         <div className='AddPost__formContainer'>
//             <div className='AddPost__formDiv'>
//                 <label htmlFor='category'>Category</label>
//                 <select id='category'>
//                     <option value='crime'>Crime and Safety </option>
//                     <option value='events'>Upcoming Events </option>
//                     <option value='lost'>Lost and Found</option>
//                 </select> 
//             </div>
//             <div className='AddPost__formDiv'>
//                 <label htmlFor='subject'>Subject</label>
//                 <input type='text' id='subject' name='subject'></input>
//             </div>
//         </div>
//         <div className='messageAdd'>
//             <label htmlFor='message'>Message</label>
//             {/* <textarea id='message' name='message' rows='5' cols='30'>
//             </textarea> */}
//             <input type='text' id='message' name='message'></input>
//         </div>
//         <div className='AddPost__formContainer'>
//             <div className='AddPost__formDiv'>
//                     <input type='file'/>
//                 </div>
//             <button type='submit'>Submit</button>
//             <button type='button'>Cancel</button>
//         </div>
//     </form>
// ) : null}