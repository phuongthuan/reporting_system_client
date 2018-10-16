import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import NoMatch from '../../utils/NoMatch';

const AuthPage = ({ match }) => (
  <Switch>
    <Route path={match.path} component={AuthContainer} />
    <Route component={NoMatch} />
  </Switch>
);
export default AuthPage;