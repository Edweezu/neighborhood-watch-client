import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import LoginForm from './LoginForm'


describe('LoginForm component', () => {
    const props = {
        onLoginSuccess: () => {

        },
    }

    it('renders the given component', () => {
        const wrapper = shallow(<LoginForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<LoginForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})