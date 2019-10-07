import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import Spinner from '../Spinner/Spinner'
import Images from '../Images/Images'
import Button from '../Button/Button'
import { withRouter } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
// import { findPlace } from '../../helpers'

class AddPost extends React.Component {

    state = {
        showForm: false,
        image: null,
        uploading: false
    }

    handleClick = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    static contextType = MainContext

    handleSubmitForm = () => {
        this.setState({
            showForm: false
        })
    }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     // let { image } = this.state
    //     let { subject, message, post_category } = e.target

    //     let newPost = {
    //         subject: subject.value,
    //         message: message.value,
    //         post_category: post_category.value,
    //         date_created: new Date(),
    //         // image
    //     }

    //     console.log('newpost', newPost)

    //     return fetch(`${config.API_ENDPOINT}/posts`, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `bearer ${TokenService.getAuthToken()}`
    //         },
    //        body: JSON.stringify(newPost)
    //     })
    //     .then(res => {
    //         if (!res.ok) {
    //             return res.json().then(e => Promise.reject(e))
    //         }
    //         return res.json()
    //     })
    //     .then(responseJson => {
    //         subject.value = ''
    //         message.value = ''
    //         // this.handleSubmitForm()
    //         this.context.addPost(responseJson)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    handleSubmit = (e) => {
        e.preventDefault()
       
        let { subject, message, post_category, browse_cities } = e.target
        let formData = new FormData()

        formData.append('subject', subject.value)
        formData.append('message', message.value)
        formData.append('post_category', post_category.value)
        formData.append('place_id', browse_cities.value)
        // formData.append('date_created', new Date())
        formData.append('image', this.state.image)
       

        console.log('formdata', formData)

        return fetch(`${config.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                // 'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        //    body: JSON.stringify(formData)
           body: formData
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            // subject.value = ''
            // message.value = ''
            // this.handleSubmitForm()
            this.setState({
                showForm: false
            })
            this.context.addPost(responseJson)
            // this.props.history.push(`/category/${responseJson.post_category}#main-menu-toggle`)
            // window.location.reload()
            
        })
        .catch(err => {
            console.error(err)
        })
    }

    onChange = e => {
        const files = Array.from(e.target.files)
        this.setState({ uploading: true })
        console.log('event target', e.target.files)
        console.log('files', files)
        const formData = new FormData()
    
        files.forEach((file, i) => {
          return formData.append(i, file)
        })

        console.log('form data', formData)
    
        return fetch(`${config.API_ENDPOINT}/posts/image`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
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
        .then(image => {
          this.setState({ 
            uploading: false,
            image
          })
        })
      }
    
      removeImage = id => {
        this.setState({
          image: this.state.image.filter(image => image.public_id !== id)
        })
      }

      handleImageChange = (e) => {
          this.setState({
            image: e.target.files[0]
          })
      }


    render () {
        // const { showForm } = this.state
        const { uploading, image } = this.state
        const { places } = this.context

        const ImageContent = () => {
            switch(true) {
              case uploading:
                return <Spinner />
              case image.length > 0:
                return <Images images={image} removeImage={this.removeImage} />
              default:
                return (
                    <input type='file' id='single' onChange={this.onChange} />
                )
                   
                
            }
          }

        //   const place = findPlace (places, place_id) || {}
      
          console.log('showform', this.state.showForm)

        return (
            <section className='AddPost'>
                <div>
                    {/* <button className='post_btn' type='button' onClick={this.handleClick}>Create Post</button> */}
                    <a href='#createPostForm' onClick={this.handleClick}className='post_btn'>Create Post</a>
                </div>
                {this.state.showForm ? (
                     <div id='createPostForm' className='AddPost__form'>
                     <form onSubmit={this.handleSubmit} action='#'>
                         <a href='#' className='cancelForm' onClick={this.handleClick}><span className="fas fa-times" aria-hidden="true"></span></a>
                         <div className='AddPost__formContainer'>
                             <div className='AddPost__formDiv'>
                                 <label htmlFor='browse_cities'>Active Page</label>
                                 <select id='browse_cities' required>
                                     {places.map(place => {
                                         return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                     })}
                                 </select>
                             </div>
                             <div className='AddPost__formDiv'>
                                 <label htmlFor='post_category'>Category</label>
                                 <select id='post_category' required>
                                     <option value='Crime and Alerts'>Crime and Safety </option>
                                     <option value='Upcoming Events'>Upcoming Events </option>
                                     <option value='Lost and Found'>Lost and Found</option>
                                 </select>  
                             </div>
                             <div className='AddPost__formDiv'>
                                 <label htmlFor='subject'>Subject</label>
                                 <input type='text' id='subject' name='subject'required></input>
                             </div>
                         </div>
                         <div className='messageAdd'>
                             <label htmlFor='message'>Message</label>
                             {/* <textarea id='message' name='message' rows='5' cols='30'>
                             </textarea> */}
                             <input type='text' id='message' name='message' required></input>
                         </div>
                         <div className='AddPost__formContainer'>
                             <div className='AddPost__formDiv'>
                                     <input type='file' id='image' name='image' onChange={this.handleImageChange}/>
                             </div>
                             {/* {ImageContent()} */}
                             {/* <a href='#' type="submit">Submit</a> */}
                             <button type='submit'>Submit</button>
                         </div>
                     </form>
                 </div>
                ) : null}
              
                <div id='AddPost__cover'></div>        
            </section>
        )    
    }
}

export default withRouter(AddPost)

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