import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import MyProfile from './MyProfile'

describe('MyProfile component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<MyProfile />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})

