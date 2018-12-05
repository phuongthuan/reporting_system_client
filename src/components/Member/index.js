import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Button, Icon, Segment, Header} from 'semantic-ui-react';
import { TaskContainerWrapper, TaskItem, TaskInput } from '../../styles/CreateTaskForm';

class Member extends React.Component {

  handleRemoveActivity = (idx) => {
    const { member, handleRemoveActivity, index } = this.props;
    const activitiessAfterRemove = member.activities.filter((a, aidx) => idx !== aidx);
    handleRemoveActivity(activitiessAfterRemove, index);
  };

  handleActivityChange = (idx) => (e) => {
    const { member, handleActivityChange, index } = this.props;
    const newTasks = member.activities.map((task, tidx) => {
      if (idx !== tidx) return task;
      return { ...task, [e.target.name]: e.target.value };
    });
    handleActivityChange(newTasks, index);
  };

  handleAddActivity = () => {
    const {handleAddActivity, index} = this.props;
    const newTask = { title: '', url: '', logtime: '' };
    handleAddActivity(newTask, index);
  };

  render() {
    const { member } = this.props;
    const userActivities = this.props.member.activities;

    const totalLogtime = userActivities
      .map(task => typeof task.logtime === 'string' ? Number(task.logtime) : task.logtime)
      .reduce((acc, cur) => acc + cur, 0);

    return (
      <Segment>
        <Header as='h4'>
          {member.user.name}
        </Header>

        <p>Total Logtime: {totalLogtime} hours</p>

        {userActivities.map((task, index) => (
          // eslint-disable-next-line
          <TaskContainerWrapper key={index}>
            <TaskItem>
              <TaskInput
                width="300px"
                autoComplete="off"
                placeholder="Title..."
                name="title"
                value={task.title}
                onChange={this.handleActivityChange(index)}
              />

              <TaskInput
                width="400px"
                autoComplete="off"
                name="url"
                value={task.url}
                onChange={this.handleActivityChange(index)}
              />

              <TaskInput
                readOnly
                width="120px"
                type="text"
                value={moment(task.createdAt).format('MM/DD/YYYY')}
              />

              <TaskInput
                width="100px"
                type="number"
                autoComplete="off"
                name="logtime"
                value={task.logtime}
                label={{ basic: true, content: 'hour(s)' }}
                labelPosition='right'
                placeholder='Logtime...'
                onChange={this.handleActivityChange(index)}
              />

              <Button
                type="button"
                style={{ marginLeft: '70px'}}
                icon
                onClick={() => this.handleRemoveActivity(index)}
              >
                <Icon name='remove circle'/>
              </Button>
            </TaskItem>
          </TaskContainerWrapper>
        ))}

        <Button
          type="button"
          color="grey"
          size="mini"
          onClick={this.handleAddActivity}
        >
          Add more...
        </Button>
      </Segment>
    );
  }
}

Member.propTypes = {
  member: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  handleRemoveActivity: PropTypes.func.isRequired,
  handleAddActivity: PropTypes.func.isRequired,
  handleActivityChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default Member;