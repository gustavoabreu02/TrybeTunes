import React from 'react';

class Login extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div data-testid="page-login">
        <p>Login</p>
      </div>
    );
  }
}

export default Login;
