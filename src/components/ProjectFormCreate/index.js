import React, { Fragment } from 'react';
import { Form, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Formik } from 'formik';
import Spinner from 'components/Spinner';

import * as Yup from 'yup';
import SelectInput from 'components/SelectInput';
import { ALL_PROJECTS_QUERY, variables } from 'components/ProjectListing';
import TextInput from '../TextInput';
import AsyncButton from '../AsyncButton';
import { CenterWrapper } from '../../styles/App';
import ErrorMessage from '../ErrorMessage';

export const ProjectSchema = Yup.object().shape({
  title: Yup.string().required('Title is required')
});

const getOptions = users => {
  const options = users.map(user => ({ value: user.id, label: user.name }));
  return options;
};

const ProjectFormCreate = () => (
  <CenterWrapper>
    <Mutation
      mutation={CREATE_PROJECT_MUTATION}
      update={(store, { data: { createProject } }) => {
        if (store.data.data.ROOT_QUERY['projects({"orderBy":"createdAt_DESC"})']) {
          const data = store.readQuery({ query: ALL_PROJECTS_QUERY, variables });
          data.projects.unshift(createProject);
          store.writeQuery({ query: ALL_PROJECTS_QUERY, data, variables });
        }
      }}
    >
      {(createProject, { loading, error }) => {
        if (error) return <ErrorMessage error={error} />;

        return (
          <Formik
            initialValues={{
              title: '',
              members: [],
              teamLeader: ''
            }}
            enableReinitialize
            validationSchema={ProjectSchema}
            onSubmit={async (values, { setSubmitting, setStatus, setErrors, resetForm }) => {
              const { title } = values;
              const teamLeader = values.teamLeader.value;
              const members = values.members.map(member => member.value);

              try {
                await createProject({
                  variables: {
                    title,
                    members,
                    teamLeader
                  }
                });
                resetForm({});
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
                        if (leaderLoading || loading) return <Spinner />;
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
                  header="Create Successfully!"
                  content="New project has been created."
                />

                <AsyncButton buttonName="Create" type="submit" />
              </Form>
            )}
          />
        );
      }}
    </Mutation>
  </CenterWrapper>
);

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION($title: String!, $members: [ID], $teamLeader: ID) {
    createProject(title: $title, members: $members, teamLeader: $teamLeader) {
      id
      title
      members {
        id
        name
      }
      teamLeader {
        id
        avatar
        name
      }
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      avatar
      phone
      roles {
        name
      }
      team {
        id
        name
      }
    }
  }
`;

export const TEAM_LEADERS_QUERY = gql`
  query TEAM_LEADERS_QUERY {
    users(where: { roles_some: { name: "TEAM_LEADER" } }) {
      id
      name
      email
    }
  }
`;

export default ProjectFormCreate;
