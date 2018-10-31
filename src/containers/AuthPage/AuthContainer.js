import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import history from '../../utils/history';
import { CURRENT_USER_QUERY } from '../../components/User';

class AuthContainer extends Component {

  render() {
    return (
      <div>
        <Mutation
          mutation={LOGIN_MUTATION}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          onCompleted={() => history.push('/reports')}
        >
          {(authenticate, { loading, error }) => (
            <div>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/plus.profile.agerange.read https://www.googleapis.com/auth/plus.profile.language.read https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics openid email profile"
                onSuccess={
                  (response) => authenticate({
                    variables: { googleCode: response.code }
                  })
                }
                onFailure={this.error}
                onRequest={this.loading}
                approvalPrompt="force"
                responseType="code"
                prompt="consent"
                // uxMode="redirect"
                // redirectUri="http://google.com"
                // disabled`
                // className='button'
                // style={{ color: 'red' }}
              >
                <span>Login with Google</span>
              </GoogleLogin>
              {loading && <p>Loading...</p>}
              {error && <p>Error: :( Please try again</p>}
            </div>
          )}

        </Mutation>

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/plus.profile.agerange.read https://www.googleapis.com/auth/plus.profile.language.read https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics openid email profile"
          onSuccess={(response) => console.log(response.code)}
          onFailure={this.error}
          onRequest={this.loading}
          approvalPrompt="force"
          responseType="code"
          prompt="consent"
          style={{ color: 'blue' }}
        >
          <span>Get Google Code</span>
        </GoogleLogin>
      </div>
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($googleCode: String!) {
    authenticate(googleCode: $googleCode) {
      user {
        name
        googleId
        avatar
        email
      }
    }
  }
`;

export default AuthContainer;
