import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileContainer from './ProfileContainer';
import NoMatch from '../../utils/NoMatch';

const ProfilePage = () => (
  <Switch>
    <Route exact path="/profile/edit" component={ProfileContainer} />
    <Route component={NoMatch} />
  </Switch>
);

export default ProfilePage;
