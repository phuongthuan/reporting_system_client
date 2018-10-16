import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SideBar from 'components/SideBar';
import AdminContainer from './AdminContainer';
import NoMatch from '../../utils/NoMatch';
import { LeftContent, MainWrapper, RightContent } from '../../styles/App';

const AdminPage = ({ match }) => (
  <MainWrapper>
    <LeftContent>
      <SideBar />
    </LeftContent>
    <RightContent>
      <Switch>
        <Route exact path={match.path} component={AdminContainer} />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default AdminPage;