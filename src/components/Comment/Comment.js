import React from 'react'
import MainContext from '../../contexts/MainContext'
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment'
import EditCommentModal from '../EditCommentModal/EditCommentModal'
import PropTypes from 'prop-types'


class Comment extends React.Component {

    static contextType = MainContext    
    static defaultProps = {
       user: {},
       nameCapitalized: () => {
       }
    }
    
    dateDiff = () => {
        let { date_created } = this.props
        let niceDate = moment(date_created, 'ddd MMM DD YYYY HH:mm:ss ZZ').format("MMM DD, YYYY")

        //how to change from provided server UTC time to local time so calculations are correct
        let daysAgo = moment.utc(date_created).local().fromNow()
        let todayUnix = moment().unix()
        let dateUnix = moment(new Date(date_created)).unix()

        //need to divide unix time by 86400 seconds in a day to find day diff
        let dateDiff = (todayUnix - dateUnix)/86400

        if (dateDiff > 6) {
            return `Posted on ${niceDate}`
        } else {
            return `Posted ${daysAgo}`
        }
    } 


    render () {
        const { id, user, text, nameCapitalized, deleteNumComment } = this.props

        return (
            <section className='Comment'>
                <div className='Comment__userInfo'>
                    {nameCapitalized(user.username)}, {user.city}
                </div>
                <div className='Post__body'>
                    {text}
                </div>
                <div className='Comment__date'>
                    <p>{this.dateDiff()}</p>
                    <EditCommentModal
                        commentId={id}
                        deleteNumComment={deleteNumComment}
                    />
                </div>  
            </section>
        )
    }
}

Comment.propTypes = {
    nameCapitalized: PropTypes.func
}

export default Comment