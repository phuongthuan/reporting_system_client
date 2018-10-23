import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';
import NoMatch from '../../utils/NoMatch';
import MemberContainer from './MemberContainer';

const MemberPage = ({ match }) => (
  <MainWrapper>
    <LeftContent>
      <SideBar />
    </LeftContent>
    <RightContent>
      <Switch>
        <Route exact path={match.path} component={MemberContainer} />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default MemberPage;