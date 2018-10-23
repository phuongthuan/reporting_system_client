import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import ProfileContainer from './ProfileContainer';
import NoMatch from '../../utils/NoMatch';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';

const ProfilePage = ({ match }) => (
  <MainWrapper>
    <LeftContent>
      <SideBar/>
    </LeftContent>
    <RightContent>
      <Switch>
        <Route exact path={`${match.path}/edit`} component={ProfileContainer} />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default ProfilePage;
