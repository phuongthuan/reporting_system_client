import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import ErrorMessage from '../ErrorMessage';
import RadioInput from '../RadioInput';
import CreateTaskForm from '../CreateTaskForm';
import { DAILY_REPORTS_QUERY } from '../../containers/DailyReportPage/DailyReportContainer';

const validate = ({ title, plan, tasks }) => ({
  title: !title || title.trim().length === 0 ? 'Title is required.' : false,
  plan: !plan || plan.trim().length === 0 ? 'Plan is required.' : false,
  tasks:
    !tasks ||
    tasks.map(task => {
      if ([task.projectId, task.url, task.logtime, task.title].includes('')) {
        return 'Field can not be empty';
      }

      return false;
    })
});

class DailyReportFormUpdate extends Component {
  state = {
    id: this.props.dailyReport.id,
    title: this.props.dailyReport.title,
    emotion: this.props.dailyReport.emotion,
    tasks: this.props.dailyReport.tasks.map(task => ({
      projectId: task.project.id,
      title: task.title,
      url: task.url,
      logtime: task.logtime.toString()
    })),
    plan: this.props.dailyReport.plan,
    comment: this.props.dailyReport.comment,
    touched: {
      title: false,
      plan: false
    },
    success: false
  };

  handleBlur = field => () => {
    const { touched } = this.state;
    this.setState({
      touched: { ...touched, [field]: true }
    });
  };

  handleTaskChange = value => this.setState({ tasks: value });

  handleAddNewTask = newTask => {
    const { tasks } = this.state;
    this.setState({ tasks: [...tasks, newTask] });
  };

  handleRemoveTask = removeTask => {
    this.setState({ tasks: removeTask });
  };

  handleTextChange = e => this.setState({ [e.target.name]: e.target.value });

  handleRadioChange = value => this.setState({ emotion: value });

  canBeSubmitted = () => {
    const errors = validate(this.state);
    const isDisabled = isErrors(errors);
    return !isDisabled;
  };

  resetForm = () => {
    this.setState({
      title: '',
      emotion: ':grinning:',
      tasks: [],
      plan: '',
      comment: '',
      touched: {
        title: false,
        plan: false
      }
    })
  };

  setStatus = (status) => {
    if (status) {
      this.setState({ success: true });
      setTimeout(() => {
        this.setState({ success: false });
      }, 3000);
    } else {
      this.setState({ success: false });
    }
  };

  render() {
    const { title, plan, comment, tasks, emotion, success } = this.state;

    // Validation handler
    const errors = validate(this.state);
    const isDisabled = isErrors(errors);
    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <Mutation
        mutation={UPDATE_DAILY_REPORT_QUERY}
        variables={this.state}
        update={(store, { data: { updateDailyReport } }) => {
          if (store.data.data.ROOT_QUERY.userReports) {
            const data = store.readQuery({ query: DAILY_REPORTS_QUERY });
            data.userReports.dailyReports = data.userReports.dailyReports.map(report =>
              report.id === updateDailyReport.id ? updateDailyReport : report
            );
            store.writeQuery({ query: DAILY_REPORTS_QUERY, data });
          }
        }}
      >
        {(updateDailyReport, { loading, error }) => {
          if (error) return <ErrorMessage error={error} />;

          return (
            <Form
              onSubmit={async e => {
                if (!this.canBeSubmitted()) {
                  e.preventDefault();
                  return;
                }
                try {
                  await updateDailyReport();
                  this.setStatus(true);
                } catch (e) {
                  this.setStatus(false);
                }
              }}
              loading={loading}
              success={success}
            >
              <TextInput
                type="text"
                label="Title"
                name="title"
                value={title}
                onChange={this.handleTextChange}
                onBlur={this.handleBlur('title')}
                error={shouldMarkError('title') ? errors.title : false}
              />

              <RadioInput onRadioChange={this.handleRadioChange} emotion={emotion} />

              <CreateTaskForm
                tasks={tasks}
                handleTaskChange={this.handleTaskChange}
                handleAddNewTask={this.handleAddNewTask}
                handleRemoveTask={this.handleRemoveTask}
                errors={errors}
              />

              <TextArea
                type="textarea"
                label="Plan for next day"
                name="plan"
                value={plan}
                onChange={this.handleTextChange}
                onBlur={this.handleBlur('plan')}
                error={shouldMarkError('plan') ? errors.plan : false}
              />

              {comment !== '' && comment !== null ? (
                <TextArea
                  type="textarea"
                  label="Comment"
                  name="comment"
                  value={comment}
                  onChange={this.handleTextChange}
                />
              ) : (
                <TextArea
                  type="textarea"
                  label="Comment"
                  name="comment"
                  value=""
                  onChange={this.handleTextChange}
                />
              )}

              <div>
                <Button
                  disabled={isDisabled}
                  type="submit"
                  color='blue'
                  size='tiny'
                >
                  Update
                </Button>

                <Button
                  onClick={this.resetForm}
                  type="button"
                  color='olive'
                  size='tiny'
                >
                  Clear
                </Button>
              </div>

              <Message
                success
                header="Update Successfully!"
                content="Your report has been updated."
              />
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

const UPDATE_DAILY_REPORT_QUERY = gql`
  mutation UPDATE_DAILY_REPORT_QUERY(
    $id: ID!
    $title: String
    $emotion: String
    $tasks: [TaskInput!]
    $plan: String
    $comment: String
  ) {
    updateDailyReport(
      id: $id
      title: $title
      emotion: $emotion
      tasks: $tasks
      plan: $plan
      comment: $comment
    ) {
      id
      title
      emotion
      tasks {
        id
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
`;

// Utils function check errors object that passing. Accept errors argument object.
// return false if not have any error.
function isErrors(errors) {
  return Object.keys(errors).some(x => {
    // check if field in error object is an array.
    if (errors[x] instanceof Array && errors[x].length === 0) {
      errors[x] = false;
    } else if (errors[x] instanceof Array && errors[x].length > 0) {
      return errors[x].some(error => typeof error === 'string');
    }
    // if not array, simple return.
    return errors[x];
  });
}

export default DailyReportFormUpdate;
