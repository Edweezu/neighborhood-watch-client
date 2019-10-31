import React from 'react'
import userIcon from '../../app-images/user icon.png'
import DashNav from '../../components/DashNav/DashNav'
import config from '../../config'
import TokenService from '../../services/token-service'
import Nav from '../../components/Nav/Nav'

class MemberProfiles extends React.Component {

    state = {
        users: []
    }

    componentDidMount () {
        return fetch(`${config.API_ENDPOINT}/users/`, {
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
                users: responseJson
            })

        })
        .catch(err => {
            console.error(err)
        })
    }

    render () {

        const { users } = this.state

        return (
            <>
                <Nav />
                <section className='MemberProfiles' id='MemberProfiles__top'>
                    <section className='MemberContainer'>
                        <DashNav />
                        <section className='MemberProfiles__userList'>
                            {users.map(user => {
                                    if (!user.make_private && user.first_name && user.email) {
                                        return (
                                            <div key= {user.id}className='MemberProfiles__user'>
                                                <div className='MemberProfiles__flexBox'>
                                                    <div className='MemberProfiles__info'>
                                                        <h2>
                                                        {user.first_name} {user.last_name}</h2> 
                                                        <p className='MemberProfiles__locationCite'><cite title='location'>{user.city}, {user.state}</cite></p>
                                                        <p><strong>Username:</strong> {user.username}</p>
                                                        <p className={user.occupation ? '' : 'display-none'}><strong>Occupation:</strong> {user.occupation}</p>
                                                        <p className={user.interests ? '' : 'display-none'}><strong>Interests:</strong> {user.interests}</p>
                                                    </div>
                                                    <div className='MemberProfiles__image'>
                                                        {user.image ? (<img className='user__image' src={user.image} alt='user-icon' width='100' height='100'/>) : (<img className='user__image' src={userIcon} alt='user-icon' width='100'/>)}
                                                    </div>
                                                </div>
                                                <a className='btn' href={`mailto:${user.email}?subject=Hi`} target="_blank" aria-label="Email Edwin Qiu" rel='noopener noreferrer'>
                                                    Connect
                                                </a>
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                }  
                            )} 
                        </section>
                    </section>
                    <div className='scroll-up-div Dashboard__scroll'>
                        <a href="#MemberProfiles__top">
                        <i className="fa fa-chevron-up"></i>          
                        </a>                   
                    </div>
                </section>
            </>
        )
    }
}

export default MemberProfiles

