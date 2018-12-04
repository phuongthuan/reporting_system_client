import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';
import NoMatch from '../../utils/NoMatch';
import TeamContainer from './TeamContainer';

const GroupPage = ({ match, userData }) => (
  <MainWrapper>
    <LeftContent>
      <SideBar />
    </LeftContent>
    <RightContent>
      <Switch>
        <Route
          exact
          path={`${match.path}/:id/teams`}
          render={props => <TeamContainer userData={userData} {...props} />}
        />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default GroupPage;
