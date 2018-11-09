import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from '../../utils/PrivateRoute';
import NoMatch from '../../utils/NoMatch';
import RouteSpinner from '../../components/RouteSpinner';

/**
 * @return {null}
 */
function loading(props) {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <RouteSpinner />;
  } else {
    return null;
  }
}

const HomePage = Loadable({
  loader: () => import('containers/HomePage'),
  loading
});

const AuthPage = Loadable({
  loader: () => import('containers/AuthPage'),
  loading,
  delay: 300
});

const MemberPage = Loadable({
  loader: () => import('containers/MemberPage'),
  loading,
  delay: 300
});

const TeamPage = Loadable({
  loader: () => import('containers/TeamPage'),
  loading,
  delay: 300
});

const DailyReportPage = Loadable({
  loader: () => import('containers/DailyReportPage'),
  loading,
  delay: 300
});

const WeeklyReportPage = Loadable({
  loader: () => import('containers/WeeklyReportPage'),
  loading,
  delay: 300
});

const ProfilePage = Loadable({
  loader: () => import('containers/ProfilePage'),
  loading,
  delay: 300
});

const AdminPage = Loadable({
  loader: () => import('containers/AdminPage'),
  loading,
  delay: 300
});

const App = () => (
  <div className="App">
    <Switch>
      <Route location={location} path="/auth" component={AuthPage} />
      <PrivateRoute location={location} exact path="/" component={HomePage} />
      <PrivateRoute location={location} path="/members" component={MemberPage} />
      <PrivateRoute location={location} path="/reports" component={DailyReportPage} />
      <PrivateRoute location={location} path="/weekly-reports" component={WeeklyReportPage} />
      <PrivateRoute location={location} path="/teams" component={TeamPage} />
      <PrivateRoute location={location} path="/profile" component={ProfilePage} />
      <PrivateRoute location={location} path="/admin" component={AdminPage} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default App;
