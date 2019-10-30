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
                            image={post.image}
                            number_of_comments={post.number_of_comments}
                            user_logged_in={post.user_logged_in}
                        />
                    </li>
                ))}
            </section>
        )
    }
}

export default PostList