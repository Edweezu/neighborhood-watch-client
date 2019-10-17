import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Footer from './Footer'


describe('Footer component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<Footer />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})