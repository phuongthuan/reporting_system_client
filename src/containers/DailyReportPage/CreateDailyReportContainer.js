import React, { Component } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { ContentWrapper } from '../../styles/App';
import DailyReportFormCreate from '../../components/DailyReportFormCreate';

class CreateDailyReportContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Header>
          New Daily Report
        </Header>
        <Divider/>
        <DailyReportFormCreate />
      </ContentWrapper>
    );
  }
}

export default CreateDailyReportContainer;
