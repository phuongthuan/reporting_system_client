import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import isEmpty from 'lodash/isEmpty';

import { Icon, Header, Divider } from 'semantic-ui-react';
import DeleteBtn from 'components/DeleteBtn';
import {
  SearchInput,
  ReportsTable,
  ReportsHeader,
  ReportsHeaderColumn,
  ReportsRow,
  ReportsRowColumn,
  IssueTag,
  IconBtn
} from 'components/Shared/Reports/styles';
import { ContentWrapper } from '../../styles/App';
import { headerItems } from './constants';
import formatDate from '../../utils/formatDate';

const DAILY_REPORTS_QUERY = gql`
  query DAILY_REPORTS_QUERY {
    userReports {
      id
      emotion
      title
      achievement
      plan
      description
      comment
      createdAt
      issues {
        id
        name
      }
    }
  }
`;

const DailyReportContainer = () => (
  <Query query={DAILY_REPORTS_QUERY}>
    {({ data, error, loading }) => {
      { loading && <p>Loading...</p> }
      { error && <p>Error: {error.message}</p> }
      if (isEmpty(data.userReports)) {
        return (
          <ContentWrapper>
            <h2>No Daily Report is submitted yet!</h2>
          </ContentWrapper>
        );
      }

      return (
        <ContentWrapper>
          <Header>
            Your Daily Reports
          </Header>
          <Divider/>
          <SearchInput
            icon="search"
            iconPosition="left"
            placeholder="Type Something ..."
          />
          <ReportsTable>
            <ReportsHeader>
              {headerItems.map(item => (
                <ReportsHeaderColumn key={item}>{item}</ReportsHeaderColumn>
              ))}
            </ReportsHeader>

            {data.userReports.map((report, i) => (
              <ReportsRow key={report.id}>
                <ReportsRowColumn>{i + 1}</ReportsRowColumn>
                <ReportsRowColumn>{report.emotion}</ReportsRowColumn>
                <ReportsRowColumn>{report.title}</ReportsRowColumn>
                <ReportsRowColumn>
                  {report.issues &&
                    report.issues.map(issue => (
                      <IssueTag key={issue.id}>{issue.name}</IssueTag>
                    ))}
                </ReportsRowColumn>
                <ReportsRowColumn>
                  {formatDate(report.createdAt)}
                </ReportsRowColumn>
                <ReportsRowColumn>
                  <IconBtn>
                    <Icon name="edit outline" bordered />
                  </IconBtn>

                  <DeleteBtn report={report} />
                </ReportsRowColumn>
              </ReportsRow>
            ))}
          </ReportsTable>
        </ContentWrapper>
      );
    }}
  </Query>
);

export default DailyReportContainer;
