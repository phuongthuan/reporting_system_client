import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class Auth extends Component {
  success = response => {
    console.log(response);
  };

  error = response => {
    console.error(response);
  };

  loading = () => {
    console.log('loading');
  };

  logout = () => {
    console.log('logout');
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/plus.profile.agerange.read https://www.googleapis.com/auth/plus.profile.language.read https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics openid email profile"
          onSuccess={this.success}
          onFailure={this.error}
          onRequest={this.loading}
          approvalPrompt="force"
          responseType="code"
          // uxMode="redirect"
          // redirectUri="http://google.com"
          // disabled`
          // prompt="consent"
          // className='button'
          // style={{ color: 'red' }}
        >
          <span>Login with Google</span>
        </GoogleLogin>
        <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
      </div>
    );
  }
}

export default Auth;
