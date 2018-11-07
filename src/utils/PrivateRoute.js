import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../components/User';
import RouteSpinner from '../components/RouteSpinner';
import { SpinnerWrapper } from '../styles/App';

const PrivateRoute = ({component: Component, data, ...rest}) => {
  const { loading, error } = data;

  if (loading) {
    return (
      <SpinnerWrapper>
        <RouteSpinner />
      </SpinnerWrapper>
    );
  }
  if (error) return <Redirect to="/auth" />;

  return (
    <Route
      {...rest}
      render={props => <Component {...props} userData={data} />}
    />
  );
};

export default graphql(CURRENT_USER_QUERY, {
  options: { fetchPolicy: 'network-only' }
})(PrivateRoute);
