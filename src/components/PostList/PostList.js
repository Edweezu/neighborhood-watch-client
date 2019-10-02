import React from 'react'
import MainContext from '../../contexts/MainContext';
import { getPostsForCategory } from '../../helpers'
import Post from '../Post/Post'


class PostList extends React.Component {

    static contextType = MainContext

    render () {

        const { place_id, posts=[] } = this.context
        const { categoryid } = this.props
        const postList = getPostsForCategory(posts, categoryid, place_id) || []
        console.log('posts', posts)
        console.log('place_id', place_id)
        console.log('categoryid', categoryid)
        console.log('postlist', postList)

        return (
            <section className='PostList'>
                {postList.map(post => (
                    <li key={post.id}>
                        <Post 
                            id={post.id}
                            subject={post.subject}
                            message={post.message}
                            date_created={post.date_created}
                            post_category={post.post_category}
                            place_id={post.place_id}
                            user_id={post.user_id}
                            user={post.user}
                        />
                    </li>
                ))}
            </section>
        )
    }
}

export default PostList