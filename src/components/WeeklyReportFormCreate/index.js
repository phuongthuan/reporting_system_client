import React, {Component} from 'react';
import {Form, Message, Button} from 'semantic-ui-react';
import MemberActivity from 'components/MemberActivity';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import TextArea from '../TextArea';
import ErrorMessage from '../ErrorMessage';

class WeeklyReportFormCreate extends Component {

  state = {
    comment: '',
    success: false
  };

  static getDerivedStateFromProps(props) {
    return {
      membersActivities: props.membersActivities,
    };
  }

  handleRemoveActivity = (activitiesAfterRemove, index) => {
    const { membersActivities } = this.state;
    const newMembersActivities = membersActivities.map((activity, adix) => {
      if (adix === index) {
        membersActivities[index].activities = activitiesAfterRemove;
      }
      return activity;
    });

    this.setState({ membersActivities: newMembersActivities });
  };

  handleActivityChange = (value, index) => {
    const { membersActivities } = this.state;
    const newMembersActivities = value.map(activity => {
      membersActivities[index].activities = value;
      return activity;
    });

    this.setState({ membersActivities: newMembersActivities });
  };

  handleAddActivity = (value, index) => {
    const { membersActivities } = this.state;
    const newMembersActivities = membersActivities.map((activity, adix) => {
      if (adix === index) {
        membersActivities[index].activities = [...membersActivities[index].activities, value];
      }
      return activity;
    });
    this.setState({ membersActivities: newMembersActivities });
  };

  handleChange = e => this.setState({ [e.target.name] : e.target.value });

  resetForm = () => {
    this.setState({
      comment: '',
      membersActivities: []
    })
  };

  setStatus = (status) => {
    if (status) {
      this.setState({ success: true });
      setTimeout(() => {
        this.setState({ success: false })
      }, 3000);
    } else {
      this.setState({ success: false });
    }
  };

  render() {
    const { comment, membersActivities, success } = this.state;

    return (
      <Mutation
        mutation={CREATE_WEEKLY_REPORT_MUTATION}
      >
        {(createWeeklyReport, { loading, error }) => {

          if (error) return <ErrorMessage error={error} />;

          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();

                try {
                  await createWeeklyReport({
                    variables: {
                      comment,
                      membersActivities: membersActivities
                        .filter(member => member.activities.length > 0)
                        .map(m => ({
                          user: m.user.id,
                          activities: m.activities.map(a => ({
                            title: a.title,
                            url: a.url,
                            logtime: a.logtime
                          }))
                        }))
                    }
                  });
                  this.setStatus(true);
                } catch (e) {
                  this.setStatus(false);
                }
              }}
              loading={loading}
              success={success}
            >
              <p>Members Activities</p>
              <MemberActivity
                membersActivities={membersActivities}
                handleRemoveActivity={this.handleRemoveActivity}
                handleActivityChange={this.handleActivityChange}
                handleAddActivity={this.handleAddActivity}
              />

              <TextArea
                type="textarea"
                label="Comment"
                name="comment"
                value={comment}
                onChange={this.handleChange}
              />

              <Button
                type="submit"
                compact
                color='blue'
                size='tiny'
              >
                Create
              </Button>

              <Message
                success
                header='Create Successfully!'
                content="Your weekly report has been created."
              />
            </Form>
          )
        }}
      </Mutation>
    );
  }
}

const CREATE_WEEKLY_REPORT_MUTATION = gql`
  mutation CREATE_WEEKLY_REPORT_MUTATION (
    $comment: String!
    $membersActivities: [UserActivityInput!]
  ) {
    createWeeklyReport(
      comment: $comment
      membersActivities: $membersActivities
    ) {
      id
      membersActivities {
        id
      }
      comment
      createdAt
    }
  }
`;

export default WeeklyReportFormCreate;