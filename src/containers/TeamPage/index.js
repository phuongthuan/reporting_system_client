import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import NoMatch from '../../utils/NoMatch';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';
import DailyReportContainer from './DailyReportContainer';
import MemberListContainer from './MemberListContainer';
import TeamContainer from './TeamContainer';
import TeamDetailContainer from './TeamDetailContainer';

const TeamPage = ({ match, userData })  => (
  <MainWrapper>
    <LeftContent>
      <SideBar />
    </LeftContent>
    <RightContent>
      <Switch>
        <Route exact path={match.url} render={props => <TeamContainer {...props} />} />
        <Route
          exact
          path={`${match.path}/:id`}
          render={props => <TeamDetailContainer userData={userData} {...props} />}
        />
        <Route
          exact
          path={`${match.path}/:id/reports`}
          render={props => <DailyReportContainer userData={userData} {...props} />}
        />
        <Route
          exact
          path={`${match.path}/:id/members`}
          render={props => <MemberListContainer userData={userData} {...props} />}
        />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default TeamPage;
