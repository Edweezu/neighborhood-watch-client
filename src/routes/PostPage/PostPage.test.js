import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import PostPage from './PostPage'


describe('PostPage component', () => {
    const props = {
        match: {
            params: {
                postId: 1
            }
          }
    }

    it('renders the given component', () => {
        const wrapper = shallow(<PostPage />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<PostPage {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})