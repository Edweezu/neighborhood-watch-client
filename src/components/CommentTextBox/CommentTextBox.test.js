import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import CommentTextBox from './CommentTextBox'


describe('CommentTextBox component', () => {
    const props = {
        postId: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<CommentTextBox />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<CommentTextBox {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})