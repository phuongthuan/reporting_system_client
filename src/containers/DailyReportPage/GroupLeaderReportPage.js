import React, {Component, Fragment} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import {Header} from 'semantic-ui-react';
import { ContentWrapper } from '../../styles/App';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import DailyReportTable from '../../components/DailyReportTable';
import DailyReportPagination from '../../components/DailyReportPagination';
import {itemsAmount} from './constants';
import SearchBox from '../../components/SearchBox';

class GroupLeaderReportPage extends Component {

  state = {
    keySearch: ''
  };

  updateSearchTerm = (keySearch) => {
    this.setState({keySearch});
  };

  getQueryVariables = currentPage => {
    const { keySearch } = this.state;
    const skip = (currentPage - 1) * itemsAmount;
    return {
      where: {
        OR: [
          {
            author: {
              name_contains: keySearch
            }
          },
          {
            title_contains: keySearch
          }
        ]
      },
      first: itemsAmount,
      skip,
      orderBy: 'createdAt_DESC'
    };
  };

  render() {
    const currentPage = Number(queryString.parse(this.props.location.search).page) || 1;
    return (
      <ContentWrapper>
        <Header as="h3" dividing>
          Daily Reports
        </Header>
        <SearchBox
          keySearch={this.state.keySearch}
          onChange={this.updateSearchTerm}
        />

        <Query
          query={DAILY_REPORTS_QUERY}
          variables={this.getQueryVariables(currentPage)}
        >
          {({ data, loading, error }) => {

            if (loading) return <Spinner/>;

            if (error) return <ErrorMessage/>;

            return (
              <Fragment>
                <DailyReportTable
                  dailyReports={data.dailyReports.dailyReports}
                  {...this.props}
                />
                <DailyReportPagination
                  data={data}
                  currentPage={currentPage}
                />
              </Fragment>
            )
          }}
        </Query>
      </ContentWrapper>
    );
  }
}

const DAILY_REPORTS_QUERY = gql`
  query DAILY_REPORTS_QUERY($where: DailyReportWhereInput, $first: Int, $skip: Int, $orderBy: DailyReportOrderByInput) {
    dailyReports(where: $where, first: $first, skip: $skip, orderBy: $orderBy) {
      count
      dailyReports {
        id
        author {
          name
          avatar
        }
        emotion
        title
        tasks {
          id
          title
          project {
            id
            title
          }
          url
          logtime
        }
        plan
        comment
        createdAt
      }
    }
  }
`;

export default GroupLeaderReportPage;