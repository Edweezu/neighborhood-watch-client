import React from 'react'
import '../../components/App/App.css'
import DashNav from '../../components/DashNav/DashNav'
// import cities from '../../data/cities'
import AddPost from '../../components/AddPost/AddPost'
import MainContext from '../../contexts/MainContext';
import PostList from '../../components/PostList/PostList';


class Dashboard extends React.Component {

    
    static contextType = MainContext

    render () {

        const { city_id, handleCityChange, cities, posts } = this.context

        // console.log('city_id state', city_id)
        // console.log('params', this.props.match.params)
        // console.log('dash posts', posts)

        return (
            <section className='Dashboard'>
                <section className='Dashboard__browseContainer'>
                    <div className='Dashboard__browseInput'>
                        <label htmlFor='browse-cities'><strong>Browse Cities</strong></label>
                        <select value={city_id}id='browse-cities' onChange={handleCityChange}>
                            {cities.map(city => {
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='Dashboard__addCity'>
                        {/* <h4>Add a City <i className="fas fa-plus-circle"></i></h4> */}
                        <h4>Add a City</h4>
                        <select name="country" className="Dashboard__addSelect countries" id="countryId">
                                <option value="">Select Country</option>
                            </select>
                            <select name="state" className="Dashboard__addSelect states" id="stateId">
                                <option value="">Select State</option>
                            </select>
                            <select name="city" className="Dashboard__addSelect cities" id="cityId">
                                <option value="">Select City</option>
                            </select>
                    </div>
                </section>
                <section className='DashContainer'>
                   
                    <DashNav />
                    <section className='DashMainPosts'>
                        <AddPost />
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