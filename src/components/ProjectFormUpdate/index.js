import React, { Fragment } from 'react';
import { Form, Message, Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Formik } from 'formik';
import Spinner from 'components/Spinner';

import SelectInput from 'components/SelectInput';
import { TEAM_LEADERS_QUERY, ALL_USERS_QUERY, ProjectSchema } from 'components/ProjectFormCreate';
import TextInput from '../TextInput';
import AsyncButton from '../AsyncButton';
import { CenterWrapper } from '../../styles/App';
import ErrorMessage from '../ErrorMessage';
import { ALL_PROJECTS_QUERY, variables } from '../ProjectListing';

const getOptions = users => {
  const options = users.map(user => ({ value: user.id, label: user.name }));
  return options;
};

const convertValuesForReactSelect = user => {
  const { name, id } = user;
  return {
    label: name,
    value: id
  };
};

const ProjectFormUpdate = ({ match }) => (
  <Query query={SINGLE_PROJECT_QUERY} variables={{ id: match.params.id }}>
    {({ data: projectData, error: projectError, loading: projectLoading }) => {
      if (projectLoading) return <Spinner />;
      if (projectError) return <ErrorMessage error={projectError} />;

      const { title, teamLeader, members } = projectData.project;

      return (
        <CenterWrapper>
          <Mutation
            mutation={UPDATE_PROJECT_MUTATION}
            update={(store, { data: { updateProject } }) => {
              if (store.data.data.ROOT_QUERY['projects({"orderBy":"createdAt_DESC"})']) {
                const data = store.readQuery({ query: ALL_PROJECTS_QUERY, variables });
                const newProjects = data.projects
                  .concat()
                  .map(project => (project.id === updateProject.id ? updateProject : project));

                store.writeQuery({
                  query: ALL_PROJECTS_QUERY,
                  variables,
                  data: {
                    projects: newProjects
                  }
                });
              }
            }}
          >
            {(updateProject, { loading, error }) => {
              if (error) return <ErrorMessage error={error} />;

              return (
                <Formik
                  initialValues={{
                    title,
                    members: members.map(m => convertValuesForReactSelect(m)),
                    teamLeader: teamLeader ? convertValuesForReactSelect(teamLeader) : ''
                  }}
                  enableReinitialize
                  validationSchema={ProjectSchema}
                  onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
                    const { id } = match.params;
                    const { title } = values;
                    const teamLeader = values.teamLeader.value;
                    const members = values.members.map(member => member.value);

                    try {
                      await updateProject({
                        variables: {
                          id,
                          title,
                          members,
                          teamLeader
                        }
                      });
                      setStatus({ success: true });
                    } catch (error) {
                      setStatus({ success: false });
                      setSubmitting(false);
                      setErrors({ submit: error.message });
                    }
                  }}
                  render={({
                    values,
                    handleSubmit,
                    handleChange,
                    setFieldTouched,
                    setFieldValue,
                    touched,
                    errors,
                    status
                  }) => (
                    <Form
                      loading={loading}
                      onSubmit={handleSubmit}
                      success={status ? status.success : false}
                    >
                      <TextInput
                        type="text"
                        label="title"
                        name="title"
                        value={values.title || ''}
                        error={touched.title && errors.title}
                        onChange={handleChange}
                      />

                      <Query query={TEAM_LEADERS_QUERY}>
                        {({ data: leaderData, loading: leaderLoading, error: leaderError }) => (
                          <Query query={ALL_USERS_QUERY}>
                            {({ data, loading, error }) => {
                              // Show <Loader /> component when TEAM_LEADERS_QUERY or ALL_USERS_QUERY are loading
                              if (leaderLoading || loading)
                                return <Loader size="tiny" active inline="centered" />;
                              if (leaderError) return <ErrorMessage error={leaderError} />;
                              if (error) return <ErrorMessage error={error} />;

                              const leaderOptions = getOptions(leaderData.users);
                              const memberOptions = getOptions(data.users);

                              return (
                                <Fragment>
                                  <SelectInput
                                    name="teamLeader"
                                    label="teamLeader"
                                    value={values.teamLeader || ''}
                                    error={touched.teamLeader && errors.teamLeader}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    options={leaderOptions}
                                  />

                                  <SelectInput
                                    name="members"
                                    label="members"
                                    value={values.members || ''}
                                    error={touched.members && errors.members}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    options={memberOptions}
                                    isMulti
                                  />
                                </Fragment>
                              );
                            }}
                          </Query>
                        )}
                      </Query>

                      <Message
                        success
                        header="Update Successfully!"
                        content="This project has been updated."
                      />

                      <AsyncButton buttonName="Update" type="submit" />
                    </Form>
                  )}
                />
              );
            }}
          </Mutation>
        </CenterWrapper>
      );
    }}
  </Query>
);

const UPDATE_PROJECT_MUTATION = gql`
  mutation UPDATE_PROJECT_MUTATION($id: ID!, $title: String, $members: [ID!], $teamLeader: ID) {
    updateProject(id: $id, title: $title, members: $members, teamLeader: $teamLeader) {
      id
      title
      members {
        id
        name
        avatar
      }
      teamLeader {
        id
        name
        avatar
      }
    }
  }
`;

const SINGLE_PROJECT_QUERY = gql`
  query SINGLE_PROJECT_QUERY($id: ID!) {
    project(where: { id: $id }) {
      id
      title
      teamLeader {
        id
        name
        avatar
      }
      members {
        id
        name
        avatar
      }
    }
  }
`;

export default ProjectFormUpdate;
