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
        showForm: false
    }

    handleClick = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }


    render () {

        const { city_id, handleCityChange, cities, posts } = this.context

        const { showForm } = this.state
        // console.log('city_id state', city_id)
        // console.log('params', this.props.match.params)
        // console.log('dash posts', posts)

        const city = findCity (cities, city_id) || {}

        return (
            <section className='Dashboard'>
                <section className='Dashboard__browseContainer'>
                    <div className='Dashboard__browseInput'>
                        {/* <label htmlFor='browse-cities'><strong>Browse Cities</strong></label> */}
                        <h4>Browse Cities</h4>
                        <select value={city_id}id='browse-cities' onChange={handleCityChange}>
                            {cities.map(city => {
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='Dashboard__addCity'>
                        {/* <h4>Add a City <i className="fas fa-plus-circle"></i></h4> */}
                        <h4>Add a City <i className="fas fa-plus-circle" onClick={this.handleClick}></i></h4>
                        {showForm ? (
                            <form className='Dashboard__addCityForm'>
                                <div className='selectContainer'>
                            <select name="country" className="Dashboard__addSelect countries" id="countryId">
                                    <option value="">Select Country</option>
                                </select>
                        </div>
                        <div className='selectContainer'>
                            <select name="state" className="Dashboard__addSelect states" id="stateId">
                                    <option value="">Select State</option>
                                </select>
                        </div>
                        <div className='selectContainer'>
                            <select name="city" className="Dashboard__addSelect cities" id="cityId">
                                    <option value="">Select City</option>
                                </select>
                        </div>  
                        <div>
                            <button type='submit'>Submit</button>
                        </div>  
                        </form>
                        ) : null}
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