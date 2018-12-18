import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { compose, graphql, Mutation } from 'react-apollo';
import { itemsAmount } from 'containers/DailyReportPage/constants';
import {Persist} from 'react-persist';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import ErrorMessage from '../ErrorMessage';
import RadioInput from '../RadioInput';
import CreateTaskForm from '../CreateTaskForm';
import {
  DAILY_REPORTS_QUERY,
  UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION,
  USER_DAILY_REPORTS_COUNT_QUERY
} from '../../containers/DailyReportPage/DailyReportContainer';
import getDailyReportsCacheVariables from '../../utils/getDailyReportsCacheVariables';

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

class DailyReportFormCreate extends Component {
  state = {
    title: '',
    emotion: ':grinning:',
    tasks: Array(3).fill({ projectId: '', title: '', url: '', logtime: '' }),
    plan: '',
    comment: '',
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

  handleRemoveTask = removeTask => this.setState({ tasks: removeTask });

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
    });
  };

  setStatus = status => {
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
    const errors = validate(this.state);
    const isDisabled = isErrors(errors);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <Mutation
        mutation={CREATE_DAILY_REPORT_MUTATION}
        variables={this.state}
        update={(store, { data: { createDailyReport } }) => {
          const { updateUserDailyReportsCount } = this.props;
          const { count } = this.props.userDailyReportsCount;
          const variables = {
            skip: 0,
            first: itemsAmount,
            orderBy: 'createdAt_DESC'
          };

          updateCacheLoop(store, variables, createDailyReport);
          updateUserDailyReportsCount({
            variables: {
              count: count + 1
            }
          });
        }}
      >
        {(createDailyReport, { loading, error }) => {
          if (error) return <ErrorMessage error={error} />;

          return (
            <Form
              onSubmit={async e => {
                if (!this.canBeSubmitted()) {
                  e.preventDefault();
                  return;
                }
                try {
                  await createDailyReport();
                  await this.setStatus(true);
                  this.resetForm();
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

              <TextArea
                type="textarea"
                label="Comment"
                name="comment"
                value={comment}
                onChange={this.handleTextChange}
              />

              <div>
                <Button
                  disabled={isDisabled}
                  type="submit"
                  color='blue'
                  size='tiny'
                >
                  Create
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
                header="Create Successfully!"
                content="Your report has been created."
              />

              <Persist
                name="create-report-form"
                data={this.state}
                debounce={500}
                onMount={data => this.setState(data)}
              />
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

const CREATE_DAILY_REPORT_MUTATION = gql`
  mutation CREATE_DAILY_REPORT_MUTATION(
    $title: String!
    $emotion: String!
    $tasks: [TaskInput!]
    $plan: String!
    $comment: String
  ) {
    createDailyReport(
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
        url
        logtime
      }
      plan
      comment
      createdAt
    }
  }
`;

function updateCacheLoop(store, variables, report) {
  const { skip, first, orderBy } = variables;
  let popped = '';
  let length = '';

  const arg = getDailyReportsCacheVariables(first, skip);

  if (store.data.data.ROOT_QUERY[arg]) {
    const data = store.readQuery({ query: DAILY_REPORTS_QUERY, variables });
    data.userReports.dailyReports.unshift(report); //Add new report to listing
    if (data.userReports.dailyReports.length > itemsAmount) {
      popped = data.userReports.dailyReports.pop(); // remove oldest report from listing if there are more than 10 reports
    }
    length = data.userReports.dailyReports.length;
    store.writeQuery({ query: DAILY_REPORTS_QUERY, data, variables });
  }

  if (length >= itemsAmount) {
    const newVariables = {
      skip: skip + itemsAmount,
      first,
      orderBy
    };
    // move to next loop if there are more than 10 reports in current page
    updateCacheLoop(store, newVariables, popped);
  }
}

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

export default compose(
  graphql(USER_DAILY_REPORTS_COUNT_QUERY, {
    props: ({ data: { userDailyReportsCount } }) => ({
      userDailyReportsCount
    })
  }),
  graphql(UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION, { name: 'updateUserDailyReportsCount' })
)(DailyReportFormCreate);

export { UPDATE_USER_DAILY_REPORTS_COUNT_MUTATION };