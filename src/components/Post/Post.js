import React from 'react'
import MainContext from '../../contexts/MainContext';
import { Link } from 'react-router-dom'
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditModal from '../EditModal/EditModal'
import moment from 'moment'
import config from '../../config'
import TokenService from '../../services/token-service';

class Post extends React.Component {

    static contextType = MainContext

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

    componentDidMount () {
        //grabs total lieks from server and displays in state
        const { id } = this.props
        // console.log('postid', id)

        Promise.all([
            fetch(`${config.API_ENDPOINT}/posts/${id}/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),

            fetch(`${config.API_ENDPOINT}/posts/${id}/likes`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                },
            })
        ])
        .then(([totalLikesRes, usersListRes]) => {
            if (!totalLikesRes.ok) {
                return totalLikesRes.json().then(e => Promise.reject(e))
            }
            if (!usersListRes.ok) {
                return usersListRes.json().then(e => Promise.reject(e))
            }

            return Promise.all([
                totalLikesRes.json(),
                usersListRes.json()
            ])
        })
        .then(([totalLikesResJson, usersListResJson]) => {
            //retrieve users who liked this post in state when component mounts in users array
            this.setState({
                likes: totalLikesResJson.likes,
                usersList: usersListResJson
                // showLike: eval(localStorage.getItem('showLike'))
            })
        })  
        .catch(err => {
            console.error(err)
        })

    }

    // handleLike = () => {
    //     //restrict user to one like per post
    //     //on click, sends patch to post route to increase by 1
    //     //on click again, sends patch to  Post route to decrease by 1
    //         //cant go below 0
    //     let { id } = this.props
    //     let { likes, showLike } = this.state
    //     let newBody = {}

    //     if (showLike) {
    //         newBody = {
    //             likes: likes + 1
    //         }
    //     } else {
    //         newBody = {
    //             likes: likes - 1
    //         }
    //     }

    //     if (newBody.likes < 0 ) {
    //         newBody.likes = 0
    //     }

    //     console.log('likes body', newBody)

    //     return fetch(`${config.API_ENDPOINT}/posts/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `bearer ${TokenService.getAuthToken()}`
    //         },
    //         body: JSON.stringify(newBody)
    //     })
    //     .then(res => {
    //         if (!res.ok) {
    //             return res.json().then(e => Promise.reject(e))
    //         }
    //         return res.json()
    //     })
    //     .then(responseJson => {
    //         this.setState({
    //             likes: responseJson.likes,
    //             showLike: (showLike ? false : true)
    //         }, () => localStorage.setItem('showLike', this.state.showLike))
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    handleLike = () => {
        //restrict user to one like per post
        //on click, sends patch to post route to increase by 1
        //on click again, sends patch to  Post route to decrease by 1
            //cant go below 0
        let { id, user_logged_in } = this.props
        let { likes, usersList } = this.state
        let newBody = {}
        let whoLiked = {}

        let usersFilter = () => {
            console.log('userlist', usersList)
            return usersList.filter(user => {
                return user.user_id === user_logged_in
            }).length
        }

        console.log('usersFilter', usersFilter())

        if (usersFilter()) {
            newBody = {
                likes: likes - 1
            }  
        } else {
            newBody = {
                likes: likes + 1
            }
        }

        if (newBody.likes < 0 ) {
            newBody.likes = 0
        }

        whoLiked.action = (usersFilter().length ? 'like': 'unlike')

        //if logged in user is contained in users array, then don't patch or post user in likes route
        console.log('likes body', newBody)
        console.log('whoLiked', whoLiked)

        if (usersFilter()) {
            Promise.all([
                fetch(`${config.API_ENDPOINT}/posts/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(newBody)
                }),
    
                fetch(`${config.API_ENDPOINT}/posts/${id}/likes`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                })
            ])
            .then(([totalLikesRes, whoLikedRes]) => {
                if (!totalLikesRes.ok) {
                    return totalLikesRes.json().then(e => Promise.reject(e))
                }
    
                if (!whoLikedRes.ok) {
                    return whoLikedRes.json().then(e => Promise.reject(e))
                }
    
                return Promise.all([
                    totalLikesRes.json(),
                    whoLikedRes.json()
                ])
            })
            .then(([totalLikesResJson, whoLikedResJson]) => {
                this.setState({
                    likes: totalLikesResJson.likes,
                    usersList: whoLikedResJson
                })
            })
            .catch(err => {
                console.error(err)
            })
        } else {
            Promise.all([
                fetch(`${config.API_ENDPOINT}/posts/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(newBody)
                }),
    
                fetch(`${config.API_ENDPOINT}/posts/${id}/likes`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(whoLiked)
                })
            ])
            .then(([totalLikesRes, whoLikedRes]) => {
                if (!totalLikesRes.ok) {
                    return totalLikesRes.json().then(e => Promise.reject(e))
                }
    
                if (!whoLikedRes.ok) {
                    return whoLikedRes.json().then(e => Promise.reject(e))
                }
    
                return Promise.all([
                    totalLikesRes.json(),
                    whoLikedRes.json()
                ])
            })
            .then(([totalLikesResJson, whoLikedResJson]) => {
                this.setState({
                    likes: totalLikesResJson.likes,
                    usersList: whoLikedResJson
                    // usersList: this.state.usersList.map(user => whoLikedResJson)
                })
            })
            .catch(err => {
                console.error(err)
            })
        }

       
        
    }

    render () {
        
        const { id, subject, message, user, image, number_of_comments, user_logged_in } = this.props
       

        const nameCapitalized = user.username.charAt(0).toUpperCase() + user.username.slice(1)
        const { likes, usersList } = this.state
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
                     {(usersList.filter(user => user.user_id === user_logged_in).length) ? 
                     (<button type='button' onClick={this.handleLike}><i className="fas fa-thumbs-down"></i>{likes > 0 ? likes : null}</button>) :
                     (<button type='button' onClick={this.handleLike}><i className="fas fa-thumbs-up"></i>{likes > 0 ? likes : null}</button>) }
                    
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
