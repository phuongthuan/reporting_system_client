import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import isEmpty from 'lodash/isEmpty';
import { SearchInput } from 'components/Shared/Reports/styles';
import { Emoji } from 'emoji-mart';
import { Header } from 'semantic-ui-react';
import Spinner from 'components/Spinner';
import { itemsAmount } from 'containers/DailyReportPage/constants';
import queryString from 'query-string';
import { headerItems } from './constants';
import { TeamReportsHeader, TeamReportsRow } from '../../styles/TeamDailyReports';
import { ContentWrapper } from '../../styles/App';
import formatDate from '../../utils/formatDate';
import history from '../../utils/history';
import ErrorMessage from '../../components/ErrorMessage';

import { ContentsTable, ContentsHeaderColumn, ContentsRowColumn } from '../../styles/ContentsTable';

class DailyReportContainer extends Component {
  isNextPageShowable = (currentPage, count) => currentPage <= (count - 1) / itemsAmount;

  isPrevPageShowable = location =>
    !isEmpty(queryString.parse(this.props.location.search).page) &&
    Number(queryString.parse(location.search).page) !== 1;

  nextPage = (currentPage, count, teamId) => {
    const nextPage = currentPage + 1;
    if (currentPage <= (count - 1) / itemsAmount) {
      history.push(`/teams/${teamId}/reports?page=${nextPage}`);
    }
  };

  prevPage = (currentPage, teamId) => {
    const prevPage = currentPage - 1;
    if (currentPage > 1) {
      history.push(`/teams/${teamId}/reports?page=${prevPage}`);
    }
  };

  getQueryVariables = (currentPage, teamId) => {
    const skip = (currentPage - 1) * itemsAmount;

    return {
      first: itemsAmount,
      skip,
      orderBy: 'createdAt_DESC',
      teamId
    };
  };

  render() {
    const currentPage = Number(queryString.parse(this.props.location.search).page) || 1;
    const { match, userData } = this.props;
    const { team } = userData.me;
    if (isEmpty(team)) return <p>error: You don't belong to any team!</p>;

    const { id: teamId } = team;
    if (match.params.id !== teamId) return <p>error: You are not the leader of this team!</p>;

    return (
      <ContentWrapper>
        <Header as="h3" dividing>
          Team's Daily Reports
        </Header>
        <Query
          query={TEAM_DAILY_REPORTS_QUERY}
          variables={this.getQueryVariables(currentPage, teamId)}
        >
          {({ data, error, loading }) => {
            if (loading) return <Spinner />;

            if (error) return <ErrorMessage error={error} />;

            const { count } = data.dailyReports;

            return (
              <Fragment>
                <SearchInput icon="search" iconPosition="left" placeholder="Type Something ..." />
                <ContentsTable>
                  <TeamReportsHeader>
                    {headerItems.map(item => (
                      <ContentsHeaderColumn key={item}>{item}</ContentsHeaderColumn>
                    ))}
                  </TeamReportsHeader>

                  {data.dailyReports.dailyReports.map((report, i) => (
                    <TeamReportsRow key={report.id}>
                      <ContentsRowColumn>{i + 1}</ContentsRowColumn>
                      <ContentsRowColumn>
                        <Emoji emoji={report.emotion} size={24} />
                      </ContentsRowColumn>
                      <ContentsRowColumn onClick={() => history.push(`/reports/${report.id}`)}>
                        <a>{report.title}</a>
                      </ContentsRowColumn>
                      <ContentsRowColumn>
                        {report.tasks.map(t => (
                          <p key={t.id}>{t.project.title}</p>
                        ))}
                      </ContentsRowColumn>
                      <ContentsRowColumn>{report.plan}</ContentsRowColumn>
                      <ContentsRowColumn>{report.author.name}</ContentsRowColumn>
                      <ContentsRowColumn>{formatDate(report.createdAt)}</ContentsRowColumn>
                    </TeamReportsRow>
                  ))}
                </ContentsTable>
                {this.isPrevPageShowable(location) && (
                  <span>
                    <button onClick={() => this.prevPage(currentPage, teamId)}>◀︎Prev</button>{' '}
                  </span>
                )}
                {this.isNextPageShowable(currentPage, count) && (
                  <button onClick={() => this.nextPage(currentPage, count, teamId)}>Next▶</button>
                )}
              </Fragment>
            );
          }}
        </Query>
      </ContentWrapper>
    );
  }
}

const TEAM_DAILY_REPORTS_QUERY = gql`
  query TEAM_DAILY_REPORTS_QUERY(
    $teamId: ID
    $first: Int
    $skip: Int
    $orderBy: DailyReportOrderByInput
  ) {
    dailyReports(
      where: { author: { team: { id: $teamId } } }
      first: $first
      skip: $skip
      orderBy: $orderBy
    ) {
      count
      dailyReports {
        id
        title
        emotion
        plan
        createdAt
        author {
          name
          team {
            name
          }
        }
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
      }
    }
  }
`;

export default DailyReportContainer;
