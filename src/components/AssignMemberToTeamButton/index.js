import React, { Component, Fragment } from 'react';
import { Modal, Form, Loader } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';

import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectInput from 'components/SelectInput';
import ErrorMessage from 'components/ErrorMessage';
import { StyledButton } from '../../styles/Group';

import { ALL_USERS_QUERY } from '../ProjectFormCreate';

class AssignMemberToTeamButton extends Component {
  state = {
    open: false,
    membersToBeUpdated: []
  };

  getOptions = (allUsers, teamUsers) => {
    // this function returns users who is not belongingto given teamUsers
    const teamUsersId = teamUsers.map(user => user.id);
    const options = allUsers.reduce((result, user) => {
      if (!teamUsersId.includes(user.id)) {
        result.push({
          value: user.id,
          label: user.name
        });
      }

      return result;
    }, []);

    return options;
  };

  handleMembersToBeUpdated = (members, client) => {
    const membersToBeUpdated = members.map(member =>
      client.readFragment({
        id: `User:${member}`,
        fragment: USER_FRAGMENT
      })
    );

    this.setState({ membersToBeUpdated });
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  render() {
    const { team, client } = this.props;
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;

    return (
      <Mutation
        mutation={ASSIGN_MEMBER_TO_TEAM_MUTATION}
        update={store => {
          const { membersToBeUpdated } = this.state;

          const updateTeamWhereMemberBlongedTo = membersToBeUpdated.map(member => {
            const { users } = store.readFragment({
              id: `Team:${member.team.id}`,
              fragment: TEAM_USERS_FRAGMENT
            });

            const newUsers = users.filter(user => user.id !== member.id);

            store.writeFragment({
              id: `Team:${member.team.id}`,
              fragment: TEAM_USERS_FRAGMENT,
              data: {
                __typename: 'Team',
                users: newUsers
              }
            });
          });

          this.setState({ membersToBeUpdated: [] });
          return updateTeamWhereMemberBlongedTo;
        }}
      >
        {(assignMembers, { loading, error }) => {
          if (loading) return <Loader size="tiny" active inline="centered" />;
          if (error) return <ErrorMessage error={error} />;

          return (
            <Query query={ALL_USERS_QUERY}>
              {({ data, loading, error }) => {
                if (loading) return <p>loading...</p>;
                if (error) return <p>error: {error.message}</p>;

                const memberOptions = this.getOptions(data.users, team.users);

                return (
                  <Fragment>
                    <StyledButton
                      floated="right"
                      size="tiny"
                      content="Assign member"
                      color="blue"
                      icon="plus"
                      labelPosition="left"
                      onClick={this.closeConfigShow(false, true)}
                    />

                    <Modal
                      open={open}
                      closeOnEscape={closeOnEscape}
                      closeOnDimmerClick={closeOnDimmerClick}
                      onClose={this.close}
                    >
                      <Modal.Header>Assign members</Modal.Header>

                      <Formik
                        initialValues={{
                          members: []
                        }}
                        enableReinitialize
                        validationSchema={AssignMemberSchema}
                        onSubmit={async (
                          values,
                          { setSubmitting, setStatus, setErrors, resetForm }
                        ) => {
                          const members = values.members.map(member => member.value);
                          this.handleMembersToBeUpdated(members, client);

                          try {
                            await assignMembers({
                              variables: {
                                id: team.id,
                                members
                              }
                            });
                            resetForm({});
                            setStatus({ success: true });
                            this.setState({ open: false });
                          } catch (error) {
                            setStatus({ success: false });
                            setSubmitting(false);
                            setErrors({ submit: error.message });
                            this.setState({ open: false });
                          }
                        }}
                        render={({
                          values,
                          submitForm,
                          handleSubmit,
                          setFieldTouched,
                          setFieldValue,
                          touched,
                          errors,
                          status
                        }) => (
                          <Fragment>
                            <Modal.Content>
                              <Form
                                loading={loading}
                                onSubmit={handleSubmit}
                                success={status ? status.success : false}
                              >
                                <SelectInput
                                  name="members"
                                  value={values.members || ''}
                                  error={touched.members && errors.members}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  options={memberOptions}
                                  width="100%"
                                  isMulti
                                />
                              </Form>
                            </Modal.Content>

                            <Modal.Actions>
                              <StyledButton
                                size="tiny"
                                content="Assign member"
                                color="blue"
                                icon="plus"
                                labelPosition="left"
                                type="submit"
                                onClick={submitForm}
                              />
                            </Modal.Actions>
                          </Fragment>
                        )}
                      />
                    </Modal>
                  </Fragment>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

const AssignMemberSchema = Yup.object().shape({
  members: Yup.array().min(1, 'Pick at least 1 member')
});

const ASSIGN_MEMBER_TO_TEAM_MUTATION = gql`
  mutation ASSIGN_MEMBER_TO_TEAM_MUTATION($id: ID!, $members: [ID!]) {
    assignMembers(id: $id, members: $members) {
      id
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
          group {
            id
          }
        }
      }
    }
  }
`;

const USER_FRAGMENT = gql`
  fragment user on User {
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
`;

const TEAM_USERS_FRAGMENT = gql`
  fragment team on Team {
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

export default withApollo(AssignMemberToTeamButton);
