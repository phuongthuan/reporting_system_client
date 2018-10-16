import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateDailyReportContainer from './CreateDailyReportContainer';
import UpdateDailyReportContainer from './UpdateDailyReportContainer';
import DailyReportDetailContainer from './DailyReportDetailContainer';
import DailyReportContainer from './DailyReportContainer';
import NoMatch from '../../utils/NoMatch';

class DailyReportPage extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/reports" component={DailyReportContainer} />
          <Route path="/reports/new" component={CreateDailyReportContainer} />
          <Route path="/reports/edit/:id" component={UpdateDailyReportContainer} />
          <Route path="/reports/:id" component={DailyReportDetailContainer} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default DailyReportPage;