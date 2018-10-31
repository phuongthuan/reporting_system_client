import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const DAILY_REPORTS_COUNT_QUERY = gql`
  query DAILY_REPORTS_COUNT_QUERY {
    userReports {
      count
    }
  }
`;

class DailyReports extends Component {

  render(){
    return(
      <Query {...this.props} query={DAILY_REPORTS_COUNT_QUERY} >
        {payload => this.props.children(payload)}
      </Query>
    )
  }
}

export default DailyReports
