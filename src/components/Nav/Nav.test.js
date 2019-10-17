import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Nav from './Nav'


describe('Nav component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<Nav />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})