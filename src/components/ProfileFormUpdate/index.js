import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { Formik } from 'formik';
import { Form, Message } from 'semantic-ui-react';
import { CenterWrapper, SpinnerWrapper } from '../../styles/App';
import Spinner from '../Spinner';
import TextInput from '../TextInput';
import AsyncButton from '../AsyncButton';

const ProfileFormUpdate = () => (
  <Query query={GET_PROFILE_QUERY}>
    {({ data, loading, error }) => {

      if (loading) {
        return (
          <SpinnerWrapper bgColor="#FFFFFF">
            <Spinner />
          </SpinnerWrapper>
        )
      }

      if (error) return <div>Error: {error.message}</div>;

      const { id, name, avatar, email, address, phone, team } = data.me;

      return (
        <Mutation
          mutation={EDIT_PROFILE_MUTATION}
        >
          {(editProfile, { loading, error }) => (
            <CenterWrapper>
              {error && <div>error</div>}

              <Formik
                initialValues={{
                  name,
                  address,
                  phone,
                  email,
                  avatar,
                  team
                }}
                enableReinitteamialize
                onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
                  const { address, phone, avatar } = values;

                  try {
                    await editProfile({
                      variables: {
                        id,
                        address,
                        phone,
                        avatar
                      }
                    });
                    setStatus({ success: true });
                  } catch (error) {
                    setStatus({ success: false });
                    setSubmitting(false);
                    setErrors({ submit: error.message });
                  }
                }}
                render={({ values, handleSubmit, handleChange, touched, errors, status }) => (
                  <Form
                    onSubmit={handleSubmit}
                    loading={loading}
                    success={status ? status.success : false}
                  >

                    <TextInput
                      disabled
                      type="text"
                      label="Name"
                      name="name"
                      defaultValue={values.name}
                    />

                    <TextInput
                      disabled
                      type="text"
                      label="Email"
                      name="email"
                      defaultValue={values.email}
                    />

                    <TextInput
                      type="text"
                      label="Address"
                      name="address"
                      defaultValue={values.address}
                      error={touched.address && errors.address}
                      onChange={handleChange}
                    />

                    <TextInput
                      type="text"
                      label="Phone"
                      name="phone"
                      defaultValue={values.phone}
                      error={touched.phone && errors.phone}
                      onChange={handleChange}
                    />

                    <TextInput
                      type="text"
                      label="Avatar"
                      name="avatar"
                      defaultValue={values.avatar}
                      error={touched.avatar && errors.avatar}
                      onChange={handleChange}
                    />

                    <TextInput
                      disabled
                      type="text"
                      label="Team"
                      name="team"
                      defaultValue={values.team}
                    />

                    <Message
                      success
                      header="Update Profile Successfully!"
                      content="Your profile has been updated."
                    />

                    <AsyncButton buttonName="Update" type="submit" loading={loading} />
                  </Form>
                )}
              />
            </CenterWrapper>
          )}
        </Mutation>
      )
    }}
  </Query>
);

const GET_PROFILE_QUERY = gql`
  query {
    me {
      id
      name
      email
      avatar
      address
      phone
      roles
      team {
        name
      }
    }
  }
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation EDIT_PROFILE_MUTATION(
    $id: ID!
    $address: String
    $phone: String
    $avatar: String
  ) {
    editProfile(
      id: $id
      address: $address
      phone: $phone
      avatar: $avatar
    ) {
      id
      address
      phone
      avatar
    }
  }
`;

export default ProfileFormUpdate;