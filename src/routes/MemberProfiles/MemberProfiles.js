import React from 'react'
import users from '../../data/users'
import userIcon from '../../app-images/user icon.png'
import DashNav from '../../components/DashNav/DashNav'

class MemberProfiles extends React.Component {
    render () {
        return (
            <section className='MemberProfiles'>
                <h2>Member Profiles</h2>
                <section class='MemberContainer '>
                    <DashNav />
                    <section className='MemberProfiles__userList'>
                        {users.map(user => (
                            
                            <div key= {user.id}className='MemberProfiles__user'>
                            <img className='user__image' src={userIcon} alt='user-icon' width='100'/>
                            <div className='MemberProfiles__info'>
                            <h3>{user.first_name}</h3> <p>Username: {user.username}</p>
                            <p>{user.city}</p>
                                <a href={`mailto:${user.email}?subject=Hi`} target="_blank" aria-label="Email Edwin Qiu" rel='noopener noreferrer'>
                                    Connect
                                </a>
                            </div>
                            </div>
                        ))} 
                    </section>
                </section>
            </section>
            
            
        )
    }
}

export default MemberProfiles

