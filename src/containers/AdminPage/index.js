import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminContainer from './AdminContainer';

class AdminPage extends Component {
  render() {
    console.log(this.props.location);
    return (
      <div>
        <Switch>
          <Route exact path="/" component={AdminContainer}/>
        </Switch>
      </div>
    );
  }
}

export default AdminPage;