import React from 'react'
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
        <i className="fas fa-bowling-ball spinner" size='5x' color='#1D3C4C'></i>
      </div>
    </div> 
    )
  }
}

export default Spinner
 