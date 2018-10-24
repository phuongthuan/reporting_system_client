import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import DailyReportFormUpdate from 'components/DailyReportFormUpdate';
import { ContentWrapper } from '../../styles/App';

class UpdateDailyReportContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Header>
          Update Daily Report
        </Header>
        <Divider/>
        <DailyReportFormUpdate {...this.props} />
      </ContentWrapper>
    );
  }
}

export default UpdateDailyReportContainer;