import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import EditModal from './EditModal'


describe('EditModal component', () => {
    const props = {
       postid: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<EditModal />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<EditModal {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})