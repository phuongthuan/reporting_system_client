import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { MainWrapper } from './styles';
import SideBar from '../../components/SideBar';
import NoMatch from '../../utils/NoMatch';

const loading = () => <div>Loading...</div>;

const HomePage = Loadable({
  loader: () => import('containers/HomePage'),
  loading
});

const AuthPage = Loadable({
  loader: () => import('containers/AuthPage'),
  loading
});

const MemberPage = Loadable({
  loader: () => import('containers/MemberPage'),
  loading
});

const DailyReportPage = Loadable({
  loader: () => import('containers/DailyReportPage'),
  loading
});

const ProfilePage = Loadable({
  loader: () => import('containers/ProfilePage'),
  loading
});

const AdminPage = Loadable({
  loader: () => import('containers/AdminPage'),
  loading
});


const App = () => (
  <div className="App">
    <Switch>
      <Route location={location} exact path="/" component={HomePage} />
      <Route location={location} path="/auth" component={AuthPage} />
      <MainWrapper>
        <SideBar/>
        <Route location={location} path="/members" component={MemberPage} />
        <Route location={location} path="/reports" component={DailyReportPage} />
        <Route location={location} path="/profile" component={ProfilePage} />
        <Route location={location} path="/admin" component={AdminPage} />
      </MainWrapper>
      <Route location={location} component={NoMatch}/>
    </Switch>
  </div>
);

export default App;
