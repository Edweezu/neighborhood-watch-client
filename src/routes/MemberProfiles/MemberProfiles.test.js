import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import MemberProfiles from './MemberProfiles'

describe('MemberProfiles component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<MemberProfiles />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})

