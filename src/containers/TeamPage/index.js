import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import NoMatch from '../../utils/NoMatch';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';
import DailyReportContainer from './DailyReportContainer';

class TeamPage extends Component {
  render() {
    const { match, userData } = this.props;

    return (
      <MainWrapper>
        <LeftContent>
          <SideBar />
        </LeftContent>
        <RightContent>
          <Switch>
            <Route
              path={`${match.path}/:id/reports`}
              render={props => <DailyReportContainer userData={userData} {...props} />}
            />
            <Route component={NoMatch} />
          </Switch>
        </RightContent>
      </MainWrapper>
    );
  }
}

export default TeamPage;
