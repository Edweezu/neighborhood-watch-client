import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBowlingBall } from '@fortawesome/free-solid-svg-icons'
class Spinner extends React.Component {

  componentDidMount () {
    document.body.style.overflowY = 'hidden'
  }

  componentWillUnmount () {
    document.body.style.overflowY = 'auto'
  }

  render () {
    return (
      <div className='rolling'>
      <div className='spinner'>
      {/* <FontAwesomeIcon icon={faBowlingBall} size='3x' color='#3B5998' /> */}
        <i className="fas fa-bowling-ball spinner" size='5x' color='#1D3C4C'></i>
      </div>
    </div>
    
    )
  }
}

export default Spinner
 