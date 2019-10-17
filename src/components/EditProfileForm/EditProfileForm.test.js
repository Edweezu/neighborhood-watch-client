import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import EditProfileForm from './EditProfileForm'


describe('EditProfileForm component', () => {
    const props = {
        updateProfileAbout: () => {

        },
    }

    it('renders the given component', () => {
        const wrapper = shallow(<EditProfileForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<EditProfileForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})