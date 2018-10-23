import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import CreateDailyReportContainer from './CreateDailyReportContainer';
import UpdateDailyReportContainer from './UpdateDailyReportContainer';
import DailyReportDetailContainer from './DailyReportDetailContainer';
import DailyReportContainer from './DailyReportContainer';
import NoMatch from '../../utils/NoMatch';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';

const DailyReportPage = ({ match }) => (
  <MainWrapper>
    <LeftContent>
      <SideBar />
    </LeftContent>
    <RightContent>
      <Switch>
        <Route exact path={match.url} component={DailyReportContainer} />
        <Route path={`${match.path}/new`} component={CreateDailyReportContainer} />
        <Route path={`${match.path}/edit/:id`} component={UpdateDailyReportContainer} />
        <Route path={`${match.path}/:id`} component={DailyReportDetailContainer} />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default DailyReportPage;