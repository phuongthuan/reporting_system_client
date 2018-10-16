import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from '../../utils/PrivateRoute';
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
      <PrivateRoute location={location} exact path="/" component={HomePage}/>
      <Route location={location} path="/auth" component={AuthPage}/>
      <PrivateRoute location={location} path="/members" component={MemberPage}/>
      <PrivateRoute location={location} path="/reports" component={DailyReportPage}/>
      <PrivateRoute location={location} path="/profile" component={ProfilePage}/>
      <PrivateRoute location={location} path="/admin" component={AdminPage}/>
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default App;