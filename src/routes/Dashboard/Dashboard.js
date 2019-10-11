import React from 'react'
import '../../components/App/App.css'
import DashNav from '../../components/DashNav/DashNav'
// import cities from '../../data/cities'
import AddPost from '../../components/AddPost/AddPost'
import MainContext from '../../contexts/MainContext';
import PostList from '../../components/PostList/PostList';
import { findPlace } from '../../helpers'
import config from '../../config'
import TokenService from '../../services/token-service'


class Dashboard extends React.Component {

    
    static contextType = MainContext

    constructor (props) {
        super(props);

        this.state = {
            showForm: false,
        }
    }

    handleClick = () => {

        this.setState({
            showForm: !this.state.showForm
        })
    }

   
  
    componentDidMount () {
        if (!window.location.hash) {
            window.location = window.location + '#loaded'
            window.location.reload()
        }

        Promise.all([
            fetch(`${config.API_ENDPOINT}/places`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),
            
            fetch(`${config.API_ENDPOINT}/posts`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),
      
            fetch(`${config.API_ENDPOINT}/comments`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }),
        ])
        .then(([placesRes, postsRes, commentsRes]) => {
            if (!placesRes.ok) {
                return placesRes.json().then(e => Promise.reject(e))
            }
      
            if (!postsRes.ok) {
                return postsRes.json().then(e => Promise.reject(e))
            }
      
            if (!commentsRes.ok) {
                return commentsRes.json().then(e => Promise.reject(e))
            }
      
            return Promise.all([
                placesRes.json(),
                postsRes.json(),
                commentsRes.json()
            ])
        })
        .then(([placesRespJson, postsRespJson, commentsRespJson]) => {
            // console.log('places', placesRespJson)
             this.context.setPlaces(placesRespJson)
             this.context.setPosts(postsRespJson)
             this.context.setComments(commentsRespJson)
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleSubmitNewCity = (e) => {
        e.preventDefault()

        const { country, state, city} = this.context
        // const { cityId, stateId, countryId } = e.target

        const pageExists = {
            id: 99999999,
            text: 'Page already exists'
        }

        const newPlace = {
            country, 
            state,
            city
        }

        console.log('new place', newPlace)
       
        // console.log('option', countryId.option[0])

        return fetch(`${config.API_ENDPOINT}/places`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newPlace)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            // console.log('resp', responseJson)
            
            if (JSON.stringify(responseJson) !== JSON.stringify(pageExists)) {
                this.context.addPlace(responseJson)
                window.location.reload()
            }
        })
        .catch(err => {
            console.error(err)
        })
       
    }
   


    render () {

        const { place_id, handleCityChange, places = [], posts = [], handleChangeCity, handleChangeState, handleChangeCountry  } = this.context

        // console.log('showform', this.state.showForm)
        // console.log('places state', this.context.places)

        // console.log('posts', posts)

        const place = findPlace (places, place_id) || {}

        return (
            <section className='Dashboard'>
                <section className='Dashboard__browseContainer'>
                    <div className='Dashboard__browseInput'>
                        {/* <label htmlFor='browse-places'><strong>Browse places</strong></label> */}
                        <h4>Browse Active Pages</h4>
                        <select value={place.id}id='browse-cities' onChange={handleCityChange}>
                            {places.map(place => {
                                return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                            })}
                        </select>
                    </div>
                    <div className='Dashboard__addCity'>
                        {/* <h4>Add a City <i className="fas fa-plus-circle" onClick={this.handleClick}></i></h4> */}
                        <h4>Dont See Your City? Start a New Page</h4>
                             <form id='addCityForm' className='Dashboard__addCityForm' onSubmit={this.handleSubmitNewCity}>
                             <div className='selectContainer'>
                                 <select name="countryId" className="Dashboard__addSelect countries" id="countryId" onChange={handleChangeCountry} required>
                                     <option value="">Select Country</option>
                                 </select>
                                 {/* <a href='#addCityForm' className='refresh'>Refresh</a> */}
                             </div>
                             <div className='selectContainer'>
                                 <select name="stateId" className="Dashboard__addSelect states" id="stateId" onChange={handleChangeState} required>
                                     <option value="">Select State</option>
                                 </select>
                             </div>
                             <div className='selectContainer'>
                                 <select name="cityId" className="Dashboard__addSelect cities" id="cityId" onChange={handleChangeCity} required>
                                     <option value="">Select City</option>
                                 </select>
                             </div>  
                             <div>
                                 <button type='submit'>Submit</button>
                             </div>  
                         </form>                    
                    </div>
                </section>
                <section className='DashMainPosts__header'>
                    <AddPost />
                    {/* <h2>{place.city}, {place.state}</h2> */}
                    <h2>{place.city}</h2>
                </section>
                <section className='DashContainer'>
                   
                    <DashNav />
                    <section className='DashMainPosts'>
                       
                        <PostList 
                            categoryid={this.props.match.params.categoryId}
                            posts={posts}
                        />
                    </section>
                </section>
            </section>           
        )
    }
}

export default Dashboard