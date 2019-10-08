import React from 'react'
import MainContext from '../../contexts/MainContext'
import { withRouter } from 'react-router-dom'

class EditModal extends React.Component {

    static defaultContext = MainContext

    render () {

        const { places=[] } = this.context
        const { hideModal, show } = this.props
        const showHideClassName = show ? 'modal display-block' : 'modal display-none'

        // console.log('state show', show)
        console.log('places', places)

        return (
            <div className={showHideClassName}>
                <section className='modal-main'>
                    <button onClick={hideModal}>
                            <span className="fas fa-times" aria-hidden="true"></span>
                        </button>
                    <form onSubmit={this.handleSubmit} action='#'>
                        
                         <div className='AddPost__formContainer'>
                             <div className='AddPost__formDiv'>
                                 <label htmlFor='browse_cities'>Active Page</label>
                                 <select id='browse_cities' >
                                     {places.map(place => {
                                         return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                     })}
                                 </select>
                             </div>
                             <div className='AddPost__formDiv'>
                                 <label htmlFor='post_category'>Category</label>
                                 <select id='post_category' >
                                     <option value='Crime and Alerts'>Crime and Safety </option>
                                     <option value='Upcoming Events'>Upcoming Events </option>
                                     <option value='Lost and Found'>Lost and Found</option>
                                 </select>  
                             </div>
                             <div className='AddPost__formDiv'>
                                 <label htmlFor='subject'>Subject</label>
                                 <input type='text' id='subject' name='subject'></input>
                             </div>
                         </div>
                         <div className='messageAdd'>
                             <label htmlFor='message'>Message</label>
                             <input type='text' id='message' name='message' ></input>
                         </div>
                         <div className='AddPost__formContainer'>
                             <div className='AddPost__formDiv'>
                                     <input type='file' id='image' name='image' onChange={this.handleImageChange}/>
                             </div>
                             {/* <a href='#' type="submit">Submit</a> */}
                             <button type='submit'>Submit</button>
                         </div>
                     </form>
                </section>
            </div>
        )
    }
}

export default withRouter(EditModal)