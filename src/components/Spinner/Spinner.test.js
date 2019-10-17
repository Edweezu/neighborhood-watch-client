import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Spinner from './Spinner'


describe('Spinner component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<Spinner />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})