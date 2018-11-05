import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import NoMatch from '../../utils/NoMatch';
import WeeklyReportContainer from './WeeklyReportContainer';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';
import CreateWeeklyReportContainer from './CreateWeeklyReportContainer';

const WeeklyReportPage = ({ match }) => (
  <MainWrapper>
    <LeftContent>
      <SideBar />
    </LeftContent>
    <RightContent>
      <Switch>
        <Route exact path={match.url} render={props => <WeeklyReportContainer {...props} />} />
        <Route path={`${match.path}/new`} component={CreateWeeklyReportContainer} />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default WeeklyReportPage;
