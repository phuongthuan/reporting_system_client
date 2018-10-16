import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../components/User';

const PrivateRoute = ({component: Component, data, ...rest}) => {

  const { loading, error } = data;

  if (loading) return <div>Loading...</div>;
  if (error) return <Redirect to="/auth"/>;

  return (
    <Route
      {...rest}
      render={props => <Component {...props} />}
    />
  );
};

export default graphql(CURRENT_USER_QUERY, {
  options: { fetchPolicy: 'network-only' }
})(PrivateRoute);