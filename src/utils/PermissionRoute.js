import React from 'react';
import { Route } from 'react-router-dom';
import NoPermision from './NoPermission';

const PermissionRoute = ({ component: Component, userData, roles, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      (userData.me.roles.some(role => roles.includes(role.name))) ? (
        <Component {...props} />
      ) : (
        <NoPermision location={props.location} />
      )
    }
  />
);

export default PermissionRoute;