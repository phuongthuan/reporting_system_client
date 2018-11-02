import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { ContentWrapper } from '../../styles/App';
import ProfileFormUpdate from '../../components/ProfileFormUpdate';

class ProfileContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Header>
          Update Profile
        </Header>
        <Divider/>
        <ProfileFormUpdate />
      </ContentWrapper>
    );
  }
}



export default ProfileContainer;