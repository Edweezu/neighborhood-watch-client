import React from 'react'
// import { findUser } from '../../helpers'
import MainContext from '../../contexts/MainContext';
import fileImage from '../../app-images/file-image-icon.png'
import { Link } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditModal from '../EditModal/EditModal'
import moment from 'moment'

class Post extends React.Component {

    static contextType = MainContext



    dateDiff = () => {
        let { date_created } = this.props


        let formattedDate = moment(date_created, 'ddd MMM DD YYYY HH:mm:ss ZZ').format("YYYYMMDD")
        let niceDate = moment(date_created, 'ddd MMM DD YYYY HH:mm:ss ZZ').format("MMM DD, YYYY")

        //how to change from provided server UTC time to local time so calculations are correct
        let daysAgo = moment.utc(date_created).local().fromNow()

        let todayUnix = moment().unix()
        
        let dateUnix = moment(new Date(date_created)).unix()
        //need to divide unix time by 86400 seconds in a day to find day diff
        let dateDiff = (todayUnix - dateUnix)/86400

        // console.log('date diff', dateDiff)
        if (dateDiff > 6) {
            return `Posted on ${niceDate}`
        } else {
            return `Posted ${daysAgo}`
        }
    } 

     

    render () {
        // const { users=[] } = this.context
        // const { places } = this.context
        const { id, subject, message, user, image } = this.props
        // const user = findUser(users, user_id) || []
        // console.log('places', places)
        // console.log('users', users)
        // console.log('user id', user_id)
        // console.log('user', user)
      
        

        
        const nameCapitalized = user.username.charAt(0).toUpperCase() + user.username.slice(1)

        
        return (
            <section className='Post'>
                <div className='Post__userInfo'>
                    {nameCapitalized}, {user.city}
                </div>
                <div>
                    <h4><Link to={`/post-page/${id}`}>{subject}</Link></h4>
                    <p>{message}</p>
                    {image ? (
                        <figure>
                        <img src={image} alt='default icon' width='100'/>
                        <figcaption>User uploaded image is going to replace this.</figcaption> 
                        </figure>
                    ): null}
                <div>
                    {/* Need to instantiate a function when not using onClick, etc. */}
                    <p>{this.dateDiff()}</p>
                    <EditModal
                        // show={this.state.show}
                        // hideModal={this.hideModal}
                        postid={id}
                    />  
                </div>
                 <div>
                    <button type='button'><i className="fas fa-thumbs-up"></i></button>
                </div>
                </div>

            </section>
        )
    }
}

export default Post
