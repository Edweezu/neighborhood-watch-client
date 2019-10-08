import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import { withRouter } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'
// import { findPlace } from '../../helpers'

class AddPost extends React.Component {

    state = {
        // showForm: false,
        image: null,
        uploading: false
    }

  

    static contextType = MainContext

    handleSubmitForm = () => {
        this.setState({
            showForm: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
       
        let { subject, message, post_category, browse_cities } = e.target
        let formData = new FormData()

        formData.append('subject', subject.value)
        formData.append('message', message.value)
        formData.append('post_category', post_category.value)
        formData.append('place_id', browse_cities.value)
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
            // this.setState({
            //     showForm: false
            // })
            this.context.addPost(responseJson)
            this.props.history.push(`/category/${responseJson.post_category}#main-menu-toggle`)
            // window.location.reload()
            
        })
        .catch(err => {
            console.error(err)
        })
    }

   
    
      
      handleImageChange = (e) => {
          this.setState({
            image: e.target.files[0]
          })
      }


    render () {
        // const { showForm } = this.state
        const { places, showAddForm, handleAddPostClick } = this.context

      
        //   console.log('showform', showAddForm)

        return (
            <section className='AddPost'>
                <div>
                    {/* <button className='post_btn' type='button' onClick={this.handleClick}>Create Post</button> */}
                    <a href='#createPostForm' onClick={handleAddPostClick}className='post_btn'>Create Post</a>
                </div>
                {showAddForm ? (
                     <div id='createPostForm' className='AddPost__form'>
                     <form onSubmit={this.handleSubmit} action='#'>
                         <a href='#' className='cancelForm' onClick={handleAddPostClick}><span className="fas fa-times" aria-hidden="true"></span></a>
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
                             <input type='text' id='message' name='message' required></input>
                         </div>
                         <div className='AddPost__formContainer'>
                             <div className='AddPost__formDiv'>
                                     <input type='file' id='image' name='image' onChange={this.handleImageChange}/>
                             </div>
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

