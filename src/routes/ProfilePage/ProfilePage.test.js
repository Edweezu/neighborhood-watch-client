import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import ProfilePage from './ProfilePage'


describe('ProfilePage component', () => {
    const props = {
        match: {
            params: {
                userId: 1
            }
          }
    }

    it('renders the given component', () => {
        const wrapper = shallow(<ProfilePage />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<ProfilePage {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})