import React from 'react'

const MainContext = React.createContext({
    users: [],
    posts: [],
    comments: []
})

export default MainContext