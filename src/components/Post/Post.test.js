import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Post from './Post'


describe('Post component', () => {
    const props = {
       id: 1,
       subject: 'random subject',
       message: 'random message',
       user: {
        username: 'random user'
       },
       image: 'random iamge text',
       number_of_comments: 1,
       user_logged_in: 1,
       date_created: "Wed Sep 25 2019 11:45:49 GMT-0700 (Pacific Daylight Time)",

    }

    it('renders the given component', () => {
        const wrapper = shallow(<Post />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<Post {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})