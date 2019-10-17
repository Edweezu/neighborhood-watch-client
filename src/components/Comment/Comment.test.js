import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Comment from './Comment'


describe('Comment component', () => {
    const props = {
        id: 1,
        user: {
            username: 'demo',
            city: 'Santa Monica'
        },
        text: 'random text',
        nameCapitalized: () => {
            
        }
    }

    it('renders the given component', () => {
        const wrapper = shallow(<Comment />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<Comment {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})