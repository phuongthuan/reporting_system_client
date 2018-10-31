import React, { Component } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import DailyReportForm from 'components/DailyReportForm';
import { ContentWrapper } from '../../styles/App';

class CreateDailyReportContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Header>
          New Daily Report
        </Header>
        <Divider/>
        <DailyReportForm/>
      </ContentWrapper>
    );
  }
}

export default CreateDailyReportContainer;
