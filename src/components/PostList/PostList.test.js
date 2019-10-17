import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import PostList from './PostList'


describe('PostList component', () => {
    const props = {
        categoryId: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<PostList />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<PostList {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})