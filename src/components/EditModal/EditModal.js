import React from 'react'
import MainContext from '../../contexts/MainContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import Spinner from '../Spinner/Spinner'

class EditModal extends React.Component {

    static contextType = MainContext

    state = {
        image: null,
        message: '',
        post_category: '',
        subject: '',
        place_id: 1,
        show: false,
        uploading: false
    }


    showModal = () => {
        this.setState({
            show: true
        })
    }

    hideModal = () => {
        this.setState({
            show: false,
            uploading: false
        })
    }

    componentDidMount () {
        //get the post's current fields
        //set state with returned post's fields
        const { postid } = this.props
        return fetch(`${config.API_ENDPOINT}/posts/${postid}`, {
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
            // console.log('post responsejson', responseJson)
            this.setState({
                image: responseJson.image,
                message: responseJson.message,
                post_category: responseJson.post_category,
                subject: responseJson.subject,
                place_id: responseJson.place_id,
            })
        })
        .catch(err => {
            console.error(err)
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()

        let { postid } = this.props
        let { image, message, post_category, subject, place_id } = this.state

        this.setState({
            uploading: true
        })

        console.log('event target', e.target['image'].files[0])

        let formData = new FormData()

        formData.append('image', e.target['image'].files[0])
        formData.append('message', message)
        formData.append('post_category', post_category)
        formData.append('subject', subject)
        formData.append('place_id', place_id)

        return fetch(`${config.API_ENDPOINT}/posts/${postid}`, {
            method: 'PATCH',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
             console.log('patch responsejson', responseJson)
            this.context.updatePost(responseJson)
            this.hideModal()
        })

    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handlePlaceChange = (e) => {
        this.setState({
            //only need e.target.value here because this function is already located inside the event target
            place_id: e.target.value
        })
    }
    
    handleCategoryChange = (e) => {
        this.setState({
            post_category: e.target.value
        })
    }

    handleMessageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSubjectChange = (e) => {
        this.setState({
            subject: e.target.value
        })
    }

    render () {

        const { places=[] } = this.context
        // const { hideModal, show } = this.props
        

        const { image, message, post_category, subject, place_id, show, uploading } = this.state

        const showHideClassName = show ? 'modal display-block' : 'modal display-none'

        // console.log('show', this.props.show)
        // console.log('image', image)

        return (
            <section className='EditModal'>
                {uploading ? 
                <div className={showHideClassName}>
                    <section className='modal-main'>
                        <Spinner />
                    </section>
                </div> : (
                    <div className={showHideClassName}>    
                    <section className='modal-main'>
                        <button onClick={this.hideModal}>
                                <span className="fas fa-times" aria-hidden="true"></span>
                            </button>
                        <form onSubmit={this.handleSubmit}>
                            
                            <div className='AddPost__formContainer'>
                                <div className='AddPost__formDiv'>
                                    <label htmlFor='browse_cities'>Active Page</label>
                                    <select id='browse_cities' value={place_id} onChange={this.handlePlaceChange}required>
                                        {places.map(place => {
                                            return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='AddPost__formDiv'>
                                    <label htmlFor='post_category'>Category</label>
                                    <select id='post_category' value={post_category} onChange={this.handleCategoryChange} required>
                                        <option value='Crime and Alerts'>Crime and Safety </option>
                                        <option value='Upcoming Events'>Upcoming Events </option>
                                        <option value='Lost and Found'>Lost and Found</option>
                                    </select>  
                                </div>
                                <div className='AddPost__formDiv'>
                                    <label htmlFor='subject'>Subject</label>
                                    <input type='text' id='subject' name='subject' required value={subject} onChange={this.handleSubjectChange}></input>
                                </div>
                            </div>
                            <div className='messageAdd'>
                                <label htmlFor='message'>Message</label>
                                <input type='text' id='message' name='message' value={message} onChange={this.handleMessageChange} required></input>
                            </div>
                            <div className='AddPost__formContainer'>
                                <div className='AddPost__formDiv'>
                                        <input type='file' id='image' name='image' onChange={this.handleImageChange} />
                                </div>
                                {/* <a href='#' type="submit">Submit</a> */}
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </section>
                </div>
                )}
                <button type='button' onClick={this.showModal}>
                    Edit
                </button>
                <button type='button' onClick={this.handleDeleteForm}>
                    Delete
                </button>      
            </section>
        )
    }
}

export default EditModal