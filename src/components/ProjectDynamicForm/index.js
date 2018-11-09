import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Button, Icon, Loader, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage';

class ProjectDynamicForm extends Component {

  handleProjectChange = (idx) => (evt) => {
    const { activities } = this.props;
    const newActivity = activities.map((activity, sidx) => {
      if (idx !== sidx) return activity;
      return { ...activity, id: evt.target.value };
    });

    this.setState({ activities: newActivity });
  };

  handleAddProject = () => {
    const { activities } = this.props;
    this.setState({ activities: activities.concat([{ id: '' }]) });
  };

  handleRemoveProject = (idx) => () => {
    const { activities } = this.props;
    this.setState({ activities: activities.filter((a, aidx) => idx !== aidx) });
  };

  render() {
    const { activities } = this.props;

    return (
      <Segment padded compact>
        <Query query={GET_PROJECT_OF_MEMBER}>
          {({ data, loading, error}) => {

            if (loading) return <Loader size='small' active inline='centered' />;
            if (error) return <ErrorMessage error={error} />;

            return (
              <div>
                {activities.map((project, idx) => (
                  <div key={idx}>
                    <select value={project.id} onChange={this.handleProjectChange(idx)}>
                      {data.me.projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                    <Button size='tiny' type="button" onClick={this.handleRemoveProject(idx)} icon>
                      <Icon name='remove circle' />
                    </Button>
                  </div>
                ))}
              </div>
            )
          }}
        </Query>

        <Button size='tiny' onClick={this.handleAddProject}><Icon name='add square'/>
          Add new activity
        </Button>

      </Segment>
    );
  }
}

const GET_PROJECT_OF_MEMBER = gql`
  query {
    me {
      id
      projects {
        id
        title
        tasks {
          id
          title
          url
          logtime
        }
      }
    }
  }
`;

export default ProjectDynamicForm;