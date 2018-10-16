import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import history from '../../utils/history';

const SignOut = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    onCompleted={() => history.push('/auth')}
  >
    {signout => <button onClick={signout}>Sign Out</button>}
  </Mutation>
);

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

export default SignOut;