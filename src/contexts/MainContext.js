import React from 'react'

const MainContext = React.createContext({
    users: [],
    posts: [],
    comments: [],
    places: []
})

export default MainContext