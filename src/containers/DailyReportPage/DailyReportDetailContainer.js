import React, { Fragment } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Emoji } from 'emoji-mart';
import { ContentWrapper, SpinnerWrapper } from '../../styles/App';
import Spinner from '../../components/Spinner';
import TextArea from '../../components/TextArea';

const DailyReportDetailContainer = ({ match }) => (
  <Query
    query={SINGLE_REPORT_QUERY}
    variables={{
      id: match.params.id
    }}
  >
    {({ data, loading }) => {

      if (loading) {
        return (
          <SpinnerWrapper bgColor="#FFFFFF">
            <Spinner />
          </SpinnerWrapper>
        )
      }

      if (!data.dailyReport) return <div>Daily Report Not Found for ID {match.params.id}</div>;

      const { title, emotion, tasks, plan, comment } = data.dailyReport;

      return (
        <ContentWrapper>

          <Header as='h3' dividing>
            Report Detail
          </Header>

          <Segment padded='very'>

            <Header as='h5' dividing>
              Title
            </Header>
            <p>{title}</p>

            <Header as='h5' dividing>
              Emotion
            </Header>
            <p>
              <Emoji
                emoji={emotion}
                size={24}
              />
            </p>

            <Header as='h5' dividing>
              Tasks
            </Header>
            <div>
              {tasks.map(task => <p key={task.id}>{task.title} - {task.url} - {task.logtime}</p>)}
            </div>

            <Header as='h5' dividing>
              Plan for next day
            </Header>
            <div>
              <TextArea
                style={{ width: '100%'}}
                readOnly
                value={plan}
              />
            </div>

            {comment !== '' && comment !== null && (
              <Fragment>
                <Header as='h5' dividing>
                  Comment
                </Header>
                <div>
                  <TextArea
                    style={{ width: '100%'}}
                    readOnly
                    value={comment}
                  />
                </div>
              </Fragment>
            )}

          </Segment>
        </ContentWrapper>
      )
    }}
  </Query>
);

const SINGLE_REPORT_QUERY = gql`
  query SINGLE_REPORT_QUERY($id: ID!) {
    dailyReport(where: { id: $id }) {
      id
      title
      emotion
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
    }
  }
`;

export default DailyReportDetailContainer;
export { SINGLE_REPORT_QUERY };