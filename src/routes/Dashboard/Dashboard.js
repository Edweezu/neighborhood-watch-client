import React from 'react'
import '../../components/App/App.css'
import DashNav from '../../components/DashNav/DashNav'
// import cities from '../../data/cities'
import AddPost from '../../components/AddPost/AddPost'
import MainContext from '../../contexts/MainContext';
import PostList from '../../components/PostList/PostList';
import { findCity } from '../../helpers'


class Dashboard extends React.Component {

    
    static contextType = MainContext

    state = {
        showForm: false,
        country: '',
        state: '',
        cityInput: ''
    }

    handleClick = () => {

        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleChangeCountry = (e) => {
        this.setState({
            country : e.target.value
        })
    }

    handleChangeState = (e) => {
        this.setState({
            state : e.target.value
        })
    }

    handleChangeCity = (e) => {
        this.setState({
            cityInput : e.target.value
        })
    }

   


    render () {

        const { city_id, handleCityChange, cities, posts } = this.context

        const {  country, state, cityInput } = this.state
        // console.log('country', country)
        // console.log('state', state)
        // console.log('cityyy', cityInput)
        
        // console.log('city_id state', city_id)
        // console.log('params', this.props.match.params)
        // console.log('dash posts', posts)
        
        // console.log('form state', showForm)

        const city = findCity (cities, city_id) || {}

        return (
            <section className='Dashboard'>
                <section className='Dashboard__browseContainer'>
                    <div className='Dashboard__browseInput'>
                        {/* <label htmlFor='browse-cities'><strong>Browse Cities</strong></label> */}
                        <h4>Browse Active Cities</h4>
                        <select value={city_id}id='browse-cities' onChange={handleCityChange}>
                            {cities.map(city => {
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='Dashboard__addCity'>
                        {/* <h4>Add a City <i className="fas fa-plus-circle" onClick={this.handleClick}></i></h4> */}
                        <h4>Add a City</h4>
                                   <form id='addCityForm' className='Dashboard__addCityForm'>
                                   <div className='selectContainer'>
                                       <select name="country" className="Dashboard__addSelect countries" id="countryId" onChange={this.handleChangeCountry}>
                                           <option value={country} >Select Country</option>
                                       </select>
                                       {/* <a href='#addCityForm' className='refresh'>Refresh</a> */}
                                   </div>
                                   <div className='selectContainer'>
                                       <select name="state" className="Dashboard__addSelect states" id="stateId" onChange={this.handleChangeState}>
                                           <option value={state}>Select State</option>
                                       </select>
                                   </div>
                                   <div className='selectContainer'>
                                       <select name="city" className="Dashboard__addSelect cities" id="cityId" onChange={this.handleChangeCity}>
                                           <option value={cityInput}>Select City</option>
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
                    <h2>{city.name}</h2>
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