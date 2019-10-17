import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Dashboard from './Dashboard'


describe('Dashboard component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<Dashboard />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})