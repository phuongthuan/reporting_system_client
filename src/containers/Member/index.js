import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import MemberSidebar from 'components/MemberSidebar';
import EditProfile from './EditProfile';
import DailyReports from './DailyReports';
import NewDailyReport from './NewDailyReport';

const Member = () => {
  const { pathname } = location;
  return (
    <Fragment>
      <MemberSidebar pathname={pathname} />
      <Switch>
        <Route exact path="/member/daily_reports" component={DailyReports} />
        <Route path="/member/daily_reports/new" component={NewDailyReport} />
        <Route path="/member/profile/edit" component={EditProfile} />
      </Switch>
    </Fragment>
  );
};

export default Member;
