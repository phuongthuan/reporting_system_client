import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import NoMatch from '../../utils/NoMatch';

class AuthPage extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/auth" component={AuthContainer} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default AuthPage;