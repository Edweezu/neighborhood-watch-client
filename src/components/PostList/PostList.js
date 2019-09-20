import React from 'react'
import MainContext from '../../contexts/MainContext';
import { getPostsForCategory } from '../../helpers'
import Post from '../Post/Post'


class PostList extends React.Component {

    static contextType = MainContext

    render () {

        const { city_id, posts=[] } = this.context
        const { categoryid } = this.props
        const postList = getPostsForCategory(posts, categoryid, city_id) || []
        // console.log('posts', posts)
        // console.log('city_id', city_id)
        // console.log('categoryid', categoryid)
        // console.log('postlist', postList)

        return (
            <section className='PostList'>
                {postList.map(post => (
                    <li key={post.id}>
                        <Post 
                            id={post.id}
                            subject={post.subject}
                            message={post.message}
                            date_created={post.date_created}
                            category_id={post.category_id}
                            city_id={post.city_id}
                            user_id={post.user_id}
                        />
                    </li>
                ))}
            </section>
        )
    }
}

export default PostList