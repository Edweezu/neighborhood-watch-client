import React from 'react'
import MainContext from '../../contexts/MainContext';
import { Link } from 'react-router-dom'
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditModal from '../EditModal/EditModal'
import moment from 'moment'
// import config from '../../config'
// import TokenService from '../../services/token-service';

class Post extends React.Component {

    static contextType = MainContext

    static defaultProps = {
        user: {
            username: ''
        }
    }

    state = {
        likes: 0,
        usersList: []
    }

    dateDiff = () => {
        let { date_created } = this.props


        // let formattedDate = moment(date_created, 'ddd MMM DD YYYY HH:mm:ss ZZ').format("YYYYMMDD")
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

    postCategoryIcon = () => {
        let { post_category } = this.props

        if (post_category === 'Crime and Alerts') {
            return <i className="fas fa-exclamation-triangle"></i>
        } else if (post_category === 'Upcoming Events') {
            return <i className="fas fa-calendar-alt"></i>
        } else if (post_category === 'Lost and Found') {
            return <i className="fas fa-box-open"></i>
        } else {
            return null
        }
    }

   
    render () {
        
        const { id, subject, message, user, image, number_of_comments, post_category } = this.props
       

        const nameCapitalized = user.username.charAt(0).toUpperCase() + user.username.slice(1)
        // const { likes, usersList } = this.state
        // console.log('post state', this.state)

        // console.log('post state', this.state)

        // console.log('post cat', post_category)

        // console.log('image', image)

        
        return (
            <section className='Post'>
                <div className='Post__userInfo'>
                    {this.postCategoryIcon()} {nameCapitalized}, {user.city}
                </div>
                <div>
                    <div className='Post__body'>   
                        <h4><Link to={`/post-page/${id}`}>{subject}</Link></h4>
                        <p>{message}</p>
                        {image ? (

                            <img src={image} alt='default icon'/>
                            
                        ): null}
                    </div>
                    <div className='Post__date'>
                        {/* Need to instantiate a function when not using onClick, etc. */}
                        <p>{this.dateDiff()}</p>
                        <EditModal
                            // show={this.state.show}
                            // hideModal={this.hideModal}
                            number_of_comments={number_of_comments}
                            postid={id}
                        />  
                    </div>
                 {/* <div>
                     {(usersList.filter(user => user.user_id === user_logged_in).length) ? 
                     (<button type='button' onClick={this.handleLike}><i className="fas fa-heart heartColor"></i>{likes > 0 ? likes : null}</button>) :
                     (<button type='button' onClick={this.handleLike}><i className="far fa-heart"></i>{likes > 0 ? likes : null}</button>) }
                    
                    <span className='Post__commentContainer'>
                        <i className="fas fa-comment"></i>
                        <span className='Post__commentNumber'>{number_of_comments}</span>
                    </span>
                </div> */}

                </div>

            </section>
        )
    }
}

export default Post
