import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'


class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from ||'/dashboard'
   
    history.push(destination)
  }

  render() {
    return (
      <main className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </main>
    )
  }
}

export default LoginPage