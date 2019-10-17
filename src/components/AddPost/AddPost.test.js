import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import AddPost from './AddPost'


describe('AddPost component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<AddPost />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})