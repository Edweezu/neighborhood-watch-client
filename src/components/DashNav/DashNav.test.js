import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import DashNav from './DashNav'


describe('DashNav component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<DashNav />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})