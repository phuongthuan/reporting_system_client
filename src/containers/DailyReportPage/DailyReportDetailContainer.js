import React, { Fragment } from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Emoji } from 'emoji-mart';
import { ContentWrapper, SpinnerWrapper } from '../../styles/App';
import Spinner from '../../components/Spinner';

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

      const { title, emotion, achievement, plan, comment } = data.dailyReport;

      return (
        <ContentWrapper>
          <Header>
            Report Detail
          </Header>
          <Divider/>

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
              Today Achievement
            </Header>
            <p>{achievement}</p>

            <Header as='h5' dividing>
              Plan for next day
            </Header>
            <p>{plan}</p>

            {comment !== '' && (
              <Fragment>
                <Header as='h5' dividing>
                  Comment
                </Header>
                <p>{comment}</p>
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
      achievement
      plan
      comment
    }
  }
`;

export default DailyReportDetailContainer;
export { SINGLE_REPORT_QUERY };