/* eslint-disable eqeqeq */

export const getPostsForCategory = (posts=[], categoryId, placeId) => {
    
    if (categoryId == 1) {
        return posts.filter(post => post.place_id == placeId)
    } else {
        return posts.filter(post => post.post_category == categoryId && post.place_id == placeId)
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

export const findPlace = (places, placeId) => {
    return places.find(place => place.id == placeId)
}

export const findComments = (comments, postId) => {
    return comments.filter(comment => comment.post_id == postId)
}
