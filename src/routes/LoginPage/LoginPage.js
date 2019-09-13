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
    const destination = (location.state || {}).from ||'/category/1'
   
    history.push(destination)
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}

export default LoginPage