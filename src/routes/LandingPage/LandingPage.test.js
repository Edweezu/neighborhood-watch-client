import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import LandingPage from './LandingPage'

describe('LandingPage component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<LandingPage />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})

