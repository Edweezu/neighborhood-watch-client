import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import LoginPage from './LoginPage'

describe('LoginPage component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<LoginPage />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})

