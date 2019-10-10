import React from 'react'
// import config from '../../config'
// import TokenService from '../../services/token-service'
import MainContext from '../../contexts/MainContext'
// import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment'
import EditCommentModal from '../EditCommentModal/EditCommentModal'


class Comment extends React.Component {

    static contextType = MainContext    

    

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


    render () {

        const { id, user, text, nameCapitalized } = this.props

        return (
            <section>
                <p>
                    {nameCapitalized(user.username)}, {user.city}
                    </p>
                    <p>{text}</p>
                    <p>{this.dateDiff()}</p>
                    <EditCommentModal
                        commentId={id}

                    />
                    
            </section>
        )
    }
}

export default Comment