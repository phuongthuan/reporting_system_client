import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Emoji } from 'emoji-mart';
import queryString from 'query-string';
import { Icon, Header, Divider } from 'semantic-ui-react';
import DeleteBtn from 'components/DeleteBtn';
import {
  SearchInput,
  ReportsTable,
  ReportsHeader,
  ReportsHeaderColumn,
  ReportsRow,
  ReportsRowColumn,
  IconBtn
} from 'components/Shared/Reports/styles';
import Spinner from 'components/Spinner';
import gql from 'graphql-tag';
import { Query, graphql, compose } from 'react-apollo';
import history from '../../utils/history';
import { ContentWrapper } from '../../styles/App';
import { headerItems, itemsAmount } from './constants';
import formatDate from '../../utils/formatDate';

const DAILY_REPORTS_QUERY = gql`
  query DAILY_REPORTS_QUERY($first: Int, $skip: Int) {
    userReports(first: $first, skip: $skip) {
      count
      dailyReports {
        id
        emotion
        title
        achievement
        plan
        comment
        createdAt
      }
    }
  }
`;

export const USER_DAILY_REPORTS_COUNT_QUERY = gql`
  query USER_DAILY_REPORTS_COUNT_QUERY {
    userDailyReportsCount @client {
      count
      isInitialized
      __typename
    }
  }
`;

export const UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION = gql`
  mutation UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION($count: String!) {
    updateUserDaiyReportsCount(count: $count) @client {
      count
      isInitialized
      __typename
    }
  }
`;

class DailyReportContainer extends Component {
  nextPage = data => {
    const currentPage = Number(queryString.parse(this.props.location.search).page) || 1;
    const { count } = data.userReports;
    const nextPage = currentPage + 1;
    if (currentPage <= count / itemsAmount) {
      history.push(`/reports?page=${nextPage}`);
    }
  };

  prevPage = () => {
    const currentPage = Number(queryString.parse(this.props.location.search).page) || 1;
    const prevPage = currentPage - 1;
    if (currentPage > 1) {
      history.push(`/reports?page=${prevPage}`);
    }
  };

  getQueryVariables = () => {
    const currentPage = queryString.parse(this.props.location.search).page;
    const skip = currentPage ? (currentPage - 1) * itemsAmount : 0;
    const first = itemsAmount;

    return {
      first,
      skip
    };
  };

  render() {
    const { match, location, updateUserDailyReportsCount } = this.props;
    return (
      <Query query={DAILY_REPORTS_QUERY} variables={this.getQueryVariables()}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <p>error: {error.message}</p>;
          if (isEmpty(data)) {
            return (
              <ContentWrapper>
                <h2>No Daily Report is submitted yet!</h2>
              </ContentWrapper>
            );
          }

          // ser current dailyReports count via apollo-link-state
          updateUserDailyReportsCount({
            variables: {
              count: parseInt(data.userReports.count)
            }
          });

          return (
            <ContentWrapper>
              <Header>Your Daily Reports</Header>
              <Divider />
              <SearchInput icon="search" iconPosition="left" placeholder="Type Something ..." />
              <ReportsTable>
                <ReportsHeader>
                  {headerItems.map(item => (
                    <ReportsHeaderColumn key={item}>{item}</ReportsHeaderColumn>
                  ))}
                </ReportsHeader>

                {data.userReports.dailyReports.map((report, i) => (
                  <ReportsRow key={report.id}>
                    <ReportsRowColumn>{i + 1}</ReportsRowColumn>
                    <ReportsRowColumn>
                      <Emoji emoji={report.emotion} size={24} />
                    </ReportsRowColumn>
                    <ReportsRowColumn>{report.title}</ReportsRowColumn>
                    <ReportsRowColumn>{report.achievement}</ReportsRowColumn>
                    <ReportsRowColumn>{formatDate(report.createdAt)}</ReportsRowColumn>
                    <ReportsRowColumn>
                      <IconBtn>
                        <Icon
                          name="edit"
                          bordered
                          onClick={() => history.push(`${match.path}/edit/${report.id}`)}
                        />
                      </IconBtn>

                      <DeleteBtn report={report} location={location} />
                    </ReportsRowColumn>
                  </ReportsRow>
                ))}
              </ReportsTable>
              <button onClick={() => this.prevPage()}>◀︎Prev</button>{' '}
              <button onClick={() => this.nextPage(data)}>Next▶</button>
            </ContentWrapper>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(USER_DAILY_REPORTS_COUNT_QUERY, {
    props: ({ data: { userDailyReportsCount } }) => ({
      userDailyReportsCount
    })
  }),
  graphql(UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION, { name: 'updateUserDailyReportsCount' })
)(DailyReportContainer);
export { DAILY_REPORTS_QUERY };
