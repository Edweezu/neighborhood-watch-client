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
                    <div>
                        <label htmlFor='browse-cities'>Browse Cities</label>
                        <select value={city_id}id='browse-cities' onChange={handleCityChange}>
                            {cities.map(city => {
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <h4>Add a City <i className="fas fa-plus-circle"></i></h4>
                        <label htmlFor='add-city'>
                            City Name
                        </label>
                        <input type='text' id='add-city' name='add-city'/>
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