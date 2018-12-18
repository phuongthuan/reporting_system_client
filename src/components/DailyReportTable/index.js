import React from 'react';
import {Emoji} from 'emoji-mart';
import {Image} from 'semantic-ui-react';
import { ReportsHeader, ReportsRow } from 'components/Shared/Reports/styles';
import {ContentsHeaderColumn, ContentsRowColumn, ContentsTable} from '../../styles/ContentsTable';
import history from '../../utils/history';
import formatDate from '../../utils/formatDate';

const groupLeaderHeadColumn = [
  'No',
  'Emotion',
  'Title',
  'Activities',
  'Author',
  'Date'
];

const DailyReportTable = ({ dailyReports, match }) => (
  <ContentsTable>
    <ReportsHeader>
      {groupLeaderHeadColumn.map(item => (
        <ContentsHeaderColumn key={item}>{item}</ContentsHeaderColumn>
      ))}
    </ReportsHeader>

    {dailyReports.map((report, i) => (
      <ReportsRow key={report.id}>
        <ContentsRowColumn>{i + 1}</ContentsRowColumn>
        <ContentsRowColumn>
          <Emoji emoji={report.emotion} size={24} />
        </ContentsRowColumn>
        <ContentsRowColumn onClick={() => history.push(`${match.path}/${report.id}`)}>
          <a>{report.title}</a>
        </ContentsRowColumn>
        <ContentsRowColumn>
          {report.tasks.map(t => (
            <p key={t.id}>{t.project.title}</p>
          ))}
        </ContentsRowColumn>
        <ContentsRowColumn>
          <Image src={report.author.avatar} size="mini" avatar />
          {report.author.name}
        </ContentsRowColumn>
        <ContentsRowColumn>{formatDate(report.createdAt)}</ContentsRowColumn>
      </ReportsRow>
    ))}
  </ContentsTable>
);

export default DailyReportTable;