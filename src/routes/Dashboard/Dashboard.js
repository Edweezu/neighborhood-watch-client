import React from 'react'
import '../../components/App/App.css'
import DashNav from '../../components/DashNav/DashNav'
import AddPost from '../../components/AddPost/AddPost'
import MainContext from '../../contexts/MainContext';
import PostList from '../../components/PostList/PostList';
import { findPlace } from '../../helpers'
import config from '../../config'
import TokenService from '../../services/token-service'
import Nav from '../../components/Nav/Nav'


class Dashboard extends React.Component {

    static contextType = MainContext
    static defaultProps = {
        match: {
            params: {
                categoryId: 1
            }
        }
      }

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

    appendJquery =  () => {
        let jQueryScript = document.createElement("script")
        jQueryScript.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
        jQueryScript.className = "jQuery"
        document.head.appendChild(jQueryScript)
    }

    appendGeoData = () => {
        let geoDataScript = document.createElement("script")
        geoDataScript.defer = true
        geoDataScript.src = "//geodata.solutions/includes/countrystatecity.js"
        geoDataScript.className = "geoData"
        document.head.appendChild(geoDataScript)
    }

    componentDidMount () {

        this.appendJquery()
        this.appendGeoData()

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
             this.context.setPlaces(placesRespJson)
             this.context.setPosts(postsRespJson)
             this.context.setComments(commentsRespJson)
        })
        .catch(err => {
            console.error(err)
        })
    }

    componentWillUnmount() {
        let jQuery = document.head.querySelector('.jQuery')
        let geoData = document.head.querySelector('.geoData')
        document.head.removeChild(jQuery)
        document.head.removeChild(geoData)
    }

    handleSubmitNewCity = (e) => {
        e.preventDefault()

        const { country, state, city} = this.context

        const pageExists = {
            id: 99999999,
            text: 'Page already exists'
        }

        const newPlace = {
            country, 
            state,
            city
        }

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

        const { place_id, handleCityChange, places = [], posts = [], handleChangeCity, handleChangeState, handleChangeCountry } = this.context
        const place = findPlace (places, place_id) || {}

        return (
            <>
                <Nav reg={'reg'}/>
                <section id='dashboard_top'  className='Dashboard'>
                    <section className='Dashboard__browseContainer'>
                        <div className='Dashboard__browseInput'>
                            <h4>Browse Active Pages</h4>
                            <div className='selectContainer'>
                                <select value={place.id}id='browse-cities' onChange={handleCityChange}>
                                    {places.map(place => {
                                        return <option key={place.id} value={place.id}>{place.city}, {place.state}</option>
                                    })}
                                </select>
                            </div>  
                        </div>
                        <div className='Dashboard__addCity'>
                            <h4>Dont See Your City? Start a New Page</h4>
                                <form id='addCityForm' className='Dashboard__addCityForm' onSubmit={this.handleSubmitNewCity}>
                            
                                    <div className='selectContainer'>
                                        <select name="countryId" className="Dashboard__addSelect countries" id="countryId" onChange={handleChangeCountry} required>
                                            <option value="">Select Country</option>
                                        </select>
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
                            
                                <div className='selectButtonContainer'>
                                    <button className='Dashboard__submit btn' type='submit'>Submit</button>
                                </div>  
                            </form>                    
                        </div>
                    </section>
                    <section className='Dashboard__Main'>
                        <section className='DashMainPosts__header'>
                            <AddPost />
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
                    <div className='scroll-up-div Dashboard__scroll'>
                        <a href="#dashboard_top">
                        <i className="fa fa-chevron-up"></i>          
                        </a>                   
                    </div>
                </section>
            </>       
        )
    }
}

export default Dashboard