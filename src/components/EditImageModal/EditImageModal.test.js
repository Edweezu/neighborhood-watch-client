import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import EditImageModal from './EditImageModal'


describe('EditImageModal component', () => {
    const props = {
        updateProfileImage: () => {

        },
        showImageModal: false,
        handleHideImageModal: () => {
            
        }
    }

    it('renders the given component', () => {
        const wrapper = shallow(<EditImageModal />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<EditImageModal {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})