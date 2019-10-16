import React from 'react'
// import { findUser } from '../../helpers'
import MainContext from '../../contexts/MainContext';
import { Link } from 'react-router-dom'
// import config from '../../config'
// import TokenService from '../../services/token-service'
// import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditModal from '../EditModal/EditModal'
import moment from 'moment'
import config from '../../config'
import TokenService from '../../services/token-service';

class Post extends React.Component {

    static contextType = MainContext

    state = {
        likes: 0,
        showLike: true
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

    componentDidMount () {
        //grabs total lieks from server and displays in state
        const { id } = this.props

        return fetch(`${config.API_ENDPOINT}/posts/${id}/`, {
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
            this.setState({
                likes: responseJson.likes,
                showLike: eval(localStorage.getItem('showLike'))
            })
        })  
        .catch(err => {
            console.error(err)
        })

    }

    handleLike = () => {
        //restrict user to one like per post
        //on click, sends patch to post route to increase by 1
        //on click again, sends patch to  Post route to decrease by 1
            //cant go below 0
        let { id } = this.props
        let { likes, showLike } = this.state
        let newBody = {}

        if (showLike) {
            newBody = {
                likes: likes + 1
            }
        } else {
            newBody = {
                likes: likes - 1
            }
        }

        if (newBody.likes < 0 ) {
            newBody.likes = 0
        }

        console.log('likes body', newBody)
        
        return fetch(`${config.API_ENDPOINT}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newBody)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            this.setState({
                likes: responseJson.likes,
                showLike: (showLike ? false : true)
            }, () => localStorage.setItem('showLike', this.state.showLike))
        })
        .catch(err => {
            console.error(err)
        })

    }

    render () {
        // const { users=[] } = this.context
        // const { places } = this.context
        const { id, subject, message, user, image, number_of_comments } = this.props
        // const user = findUser(users, user_id) || []
        // console.log('places', places)
        // console.log('users', users)
        // console.log('user id', user_id)
        // console.log('user', user)

        const nameCapitalized = user.username.charAt(0).toUpperCase() + user.username.slice(1)
        const { likes, showLike } = this.state
        console.log('post state', this.state)
        
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
                     {showLike ? 
                     (<button type='button' onClick={this.handleLike}><i className="fas fa-thumbs-up"></i>{likes > 0 ? likes : null}</button>) : 
                     (<button type='button' onClick={this.handleLike}><i className="fas fa-thumbs-down"></i>{likes > 0 ? likes : null}</button>)}
                    
                    <span className='Post__commentContainer'>
                        <i className="fas fa-comment"></i>
                        <span className='Post__commentNumber'>{number_of_comments}</span>
                    </span>
                </div>

                </div>

            </section>
        )
    }
}

export default Post
