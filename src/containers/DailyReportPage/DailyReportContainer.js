import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import isEmpty from 'lodash/isEmpty';
import { Emoji } from 'emoji-mart';
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
import history from '../../utils/history';
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
      comment
      createdAt
    }
  }
`;

const DailyReportContainer = ({ match }) => (
  <Query query={DAILY_REPORTS_QUERY}>
    {({ data, error, loading }) => {

      if (loading) return <Spinner />;

      if (error) return <p>Error: {error.message}</p>;

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
                <ReportsRowColumn>
                  <Emoji
                    emoji={report.emotion}
                    size={24}
                  />
                </ReportsRowColumn>
                <ReportsRowColumn>{report.title}</ReportsRowColumn>
                <ReportsRowColumn>{report.achievement}</ReportsRowColumn>
                {/*<ReportsRowColumn>{report.plan}</ReportsRowColumn>*/}
                <ReportsRowColumn>
                  {formatDate(report.createdAt)}
                </ReportsRowColumn>
                <ReportsRowColumn>
                  <IconBtn>
                    <Icon
                      name="edit"
                      bordered
                      onClick={() => history.push(`${match.path}/edit/${report.id}`)}
                    />
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
export { DAILY_REPORTS_QUERY };