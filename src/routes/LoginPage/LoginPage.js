import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Nav from '../../components/Nav/Nav'


class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { history } = this.props
    const destination = '/category/1'
   
    history.push(destination)
  }

  render() {
    return (
      <>
        <Nav />
        <section className='LoginPage'>
          <h2>Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </section>
      </>
    )
  }
}

export default LoginPage