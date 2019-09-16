
export const getPostsForCategory = (posts=[], categoryId, cityId) => {
    
    if (categoryId == 1) {
        return posts.filter(post => post.city_id == cityId)
    } else {
        return posts.filter(post => post.category_id == categoryId && post.city_id == cityId)
    }
}

export const findUser = (users=[], userId) => {
    return users.find(user => user.id == userId)
}

export const findPost = (posts=[], postId) => {
    return posts.find(post => post.id == postId)
}

export const findCommentUser = (users, commentUserId) => {
    return users.find(user => user.id == commentUserId)
}

export const findComments = (comments, postId) => {
    return comments.filter(comment => comment.posts_id == postId)
}
