import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { ContentWrapper } from '../../styles/App';
import ProfileFormUpdate from '../../components/ProfileFormUpdate';

class ProfileContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Header as='h3' dividing>
          Update Profile
        </Header>
        <ProfileFormUpdate />
      </ContentWrapper>
    );
  }
}



export default ProfileContainer;