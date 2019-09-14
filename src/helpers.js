
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
