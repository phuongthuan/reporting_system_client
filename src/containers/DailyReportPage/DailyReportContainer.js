import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Emoji } from 'emoji-mart';
import queryString from 'query-string';
import { Divider, Header, Icon } from 'semantic-ui-react';
import DeleteBtn from 'components/DeleteBtn';
import {
  IconBtn,
  ReportsHeader,
  ReportsHeaderColumn,
  ReportsRow,
  ReportsRowColumn,
  ReportsTable,
  SearchInput
} from 'components/Shared/Reports/styles';
import Spinner from 'components/Spinner';
import gql from 'graphql-tag';
import { compose, graphql, Query } from 'react-apollo';
import history from '../../utils/history';
import { ContentWrapper, SpinnerWrapper } from '../../styles/App';
import { headerItems, itemsAmount } from './constants';
import formatDate from '../../utils/formatDate';

const DAILY_REPORTS_QUERY = gql`
  query DAILY_REPORTS_QUERY($first: Int, $skip: Int, $orderBy: DailyReportOrderByInput) {
    userReports(first: $first, skip: $skip, orderBy: $orderBy) {
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

export const INITIALIZE_USER_DAILY_REPORTS_COUNT_MUTATION = gql`
  mutation INITIALIZE_USER_DAILY_REPORTS_COUNT_MUTATION($count: String!) {
    initializeUserDailyReportsCount(count: $count) @client {
      count
      isInitialized
      __typename
    }
  }
`;

export const UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION = gql`
  mutation UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION($count: String!) {
    updateUserDailyReportsCount(count: $count) @client {
      count
      isInitialized
      __typename
    }
  }
`;

class DailyReportContainer extends Component {
  isNextPageShowable = (currentPage, count) => currentPage <= (count - 1) / itemsAmount;

  isPrevPageShowable = location =>
    !isEmpty(queryString.parse(this.props.location.search).page) &&
    Number(queryString.parse(location.search).page) !== 1;

  nextPage = (currentPage, count) => {
    const nextPage = currentPage + 1;
    if (currentPage <= (count - 1) / itemsAmount) {
      history.push(`/reports?page=${nextPage}`);
    }
  };

  prevPage = currentPage => {
    const prevPage = currentPage - 1;
    if (currentPage > 1) {
      history.push(`/reports?page=${prevPage}`);
    }
  };

  getQueryVariables = currentPage => {
    const skip = (currentPage - 1) * itemsAmount;
    return {
      first: itemsAmount,
      skip,
      orderBy: 'createdAt_DESC'
    };
  };

  render() {
    const {
      match,
      location,
      initializeUserDailyReportsCount,
      updateUserDailyReportsCount
    } = this.props;
    const { count } = this.props.userDailyReportsCount;
    const currentPage = Number(queryString.parse(this.props.location.search).page) || 1;

    return (
      <Query query={DAILY_REPORTS_QUERY} variables={this.getQueryVariables(currentPage)}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <SpinnerWrapper bgColor="#FFFFFF">
                <Spinner />
              </SpinnerWrapper>
            );
          }

          if (error) return <p>error: {error.message}</p>;

          if (isEmpty(data)) {
            return (
              <ContentWrapper>
                <h2>No Daily Report is submitted yet!</h2>
              </ContentWrapper>
            );
          }

          // set current dailyReports count via apollo-link-state
          initializeUserDailyReportsCount({
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
                    <ReportsRowColumn onClick={() => history.push(`${match.path}/${report.id}`)}>
                      <a>{report.title}</a>
                    </ReportsRowColumn>
                    <ReportsRowColumn>{report.achievement}</ReportsRowColumn>
                    <ReportsRowColumn>{report.plan}</ReportsRowColumn>
                    <ReportsRowColumn>{formatDate(report.createdAt)}</ReportsRowColumn>
                    <ReportsRowColumn>
                      <IconBtn>
                        <Icon
                          name="edit"
                          bordered
                          onClick={() => history.push(`${match.path}/edit/${report.id}`)}
                        />
                      </IconBtn>

                      <DeleteBtn
                        report={report}
                        location={location}
                        count={count}
                        updateUserDailyReportsCount={updateUserDailyReportsCount}
                      />

                    </ReportsRowColumn>
                  </ReportsRow>
                ))}
              </ReportsTable>
              {this.isPrevPageShowable(location) && (
                <span>
                  <button onClick={() => this.prevPage(currentPage)}>◀︎Prev</button>{' '}
                </span>
              )}
              {this.isNextPageShowable(currentPage, count) && (
                <button onClick={() => this.nextPage(currentPage, count)}>Next▶</button>
              )}

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
  graphql(INITIALIZE_USER_DAILY_REPORTS_COUNT_MUTATION, {
    name: 'initializeUserDailyReportsCount'
  }),
  graphql(UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION, { name: 'updateUserDailyReportsCount' })
)(DailyReportContainer);
export { DAILY_REPORTS_QUERY };
