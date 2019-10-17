import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import EditCommentModal from './EditCommentModal'


describe('EditCommentModal component', () => {
    const props = {
        commentId: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<EditCommentModal />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<EditCommentModal {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})