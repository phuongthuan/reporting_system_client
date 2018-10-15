// This component is just an example how each component will be used in container
// TOOD : create container for each member function ( new daily report, edit profile, own daily reports list... )

import React, { Component } from 'react';

import MemberSidebar from 'components/MemberSidebar';
import { SubmitBtn } from 'components/Shared/Btns/styles';
import {
  ContentWrapper,
  ContentHeader
} from 'components/Shared/Contents/styles';

class MemberPage extends Component {
  render() {
    return (
      <div>
        <MemberSidebar targetText="Write a Daily Report" />
        <ContentWrapper>
          <ContentHeader>Write a Daily Report</ContentHeader>
          <SubmitBtn>Submit</SubmitBtn>
        </ContentWrapper>
      </div>
    );
  }
}

export default MemberPage;
