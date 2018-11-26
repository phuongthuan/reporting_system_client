import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ALL_PROJECTS_QUERY } from 'components/ProjectListing';
import ModalConfirm from 'components/ModalConfirm';

class ProjectDelete extends Component {
  render() {
    const { id } = this.props;

    return (
      <Mutation
        mutation={DELETE_PROJECT_MUTATION}
        update={(store, { data: { deleteProject } }) => {
          const data = store.readQuery({ query: ALL_PROJECTS_QUERY });
          data.projects = data.projects.filter(project => project.id !== deleteProject.id);
          store.writeQuery({ query: ALL_PROJECTS_QUERY, data });
        }}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteProject: {
            __typename: 'Project',
            id
          }
        }}
      >
        {(deleteProject, { error }) => {
          if (error) return <p>Error: {error.message}</p>;

          return <ModalConfirm deleteMutation={deleteProject} id={id} />;
        }}
      </Mutation>
    );
  }
}

const DELETE_PROJECT_MUTATION = gql`
  mutation DELETE_PROJECT_MUTATION($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export default ProjectDelete;
