import React from 'react';
import { Icon } from 'semantic-ui-react';

import MemberSidebar from 'components/MemberSidebar';
import {
  SearchInput,
  ReportsTable,
  ReportsHeader,
  ReportsHeaderColumn,
  ReportsRow,
  ReportsRowColumn,
  IssueTag,
  IconBtn
} from 'components/Shared/Reports/styles';
import {
  ContentWrapper,
  ContentHeader
} from 'components/Shared/Contents/styles';
import { headerItems, items } from './constants';

const DailyReports = () => (
  <div>
    <MemberSidebar targetText="Write a Daily Report" />
    <ContentWrapper>
      <ContentHeader>Your Daily Reports</ContentHeader>
      <SearchInput
        icon="search"
        iconPosition="left"
        placeholder="Type Something ..."
      />
      <ReportsTable>
        <ReportsHeader>
          {headerItems.map(item => (
            <ReportsHeaderColumn>{item}</ReportsHeaderColumn>
          ))}
        </ReportsHeader>

        {items.map(item => (
          <ReportsRow>
            <ReportsRowColumn>{item.id}</ReportsRowColumn>
            <ReportsRowColumn>{item.emoticon}</ReportsRowColumn>
            <ReportsRowColumn>
              {item.issues.map(issue => (
                <IssueTag>{issue.name}</IssueTag>
              ))}
            </ReportsRowColumn>
            <ReportsRowColumn>{item.date}</ReportsRowColumn>
            <ReportsRowColumn>
              <IconBtn>
                <Icon name="edit outline" bordered rotated />
              </IconBtn>

              <IconBtn>
                <Icon bordered inverted color="red" name="trash alternate" />
              </IconBtn>
            </ReportsRowColumn>
          </ReportsRow>
        ))}
      </ReportsTable>
    </ContentWrapper>
  </div>
);

export default DailyReports;
