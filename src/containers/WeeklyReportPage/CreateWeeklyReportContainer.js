import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { ContentWrapper } from '../../styles/App';
import WeeklyReportFormCreate from '../../components/WeeklyReportFormCreate';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

class CreateWeeklyReportContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Header>
          New Weekly Report
        </Header>
        <Divider/>

        <Query query={GET_MEMBER_TASKS}>
          {({ data, loading, error }) => {

            if (loading) return <Spinner />;
            if (error) return <ErrorMessage error={error} />;

            const membersActivities = data.me.team.users
              .map(member => {
                let activities = [];
                member.dailyReports.map(report => {
                  activities.push({ createdAt: report.createdAt, tasks: report.tasks });
                });

                return {
                  user: member,
                  activities: activities.map(a => a.tasks.map(t => ({
                    title: t.title,
                    logtime: t.logtime,
                    url: t.url,
                    createdAt: a.createdAt
                  })))
                }
              })
              .map(a => ({
                user: a.user,
                activities: [].concat(...a.activities).map(a => ({ // Merge all sub array to one.
                  title: a.title,
                  logtime: a.logtime,
                  url: a.url,
                  createdAt: a.createdAt
                }))
              }));

            return (
              <WeeklyReportFormCreate membersActivities={membersActivities} />
            )
          }}
        </Query>
      </ContentWrapper>
    );
  }
}

const GET_MEMBER_TASKS = gql`
  query GET_MEMBER_TASKS {
    me {
      id
      name
      team {
        id
        name
        users {
          id
          name
          dailyReports {
            id
            tasks {
              id
              title
              url
              logtime
              createdAt
            }
            createdAt
          }
        }
      }
    }
  }
`;

export default CreateWeeklyReportContainer;