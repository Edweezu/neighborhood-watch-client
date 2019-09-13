import React from 'react'
import MainContext from '../../contexts/MainContext';
import { getPostsForCategory } from '../../helpers'


//NoteListMain
class PostList extends React.Component {

    static contextType = MainContext

    render () {

        const { city_id, posts=[] } = this.context
        const { categoryid } = this.props
        const postList = getPostsForCategory(posts, categoryid, city_id) || []
        console.log('posts', posts)
        console.log('city_id', city_id)
        console.log('categoryid', categoryid)
        console.log('postlist', postList)

        return (
            <section className='PostList'>
                {postList.map(post => (
                    <li key={post.id}>
                        City: {post.city_id}
                        Category: {post.categoryId}
                        {post.subject}
                    </li>
                ))}
            </section>
        )
    }
}

export default PostList