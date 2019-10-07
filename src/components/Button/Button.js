import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faImage } from '@fortawesome/free-solid-svg-icons'

export default props => 
    <div className='AddPost__formDiv'>
      <label htmlFor='single'>
      <i class="fas fa-image"></i>
        Add Photo
      </label>
      <input type='file' id='single' onChange={props.onChange} /> 
    </div>