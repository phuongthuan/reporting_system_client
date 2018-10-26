import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Icon } from 'semantic-ui-react';
import { IconBtn } from 'components/Shared/Reports/styles';
import { DAILY_REPORTS_QUERY } from '../../containers/DailyReportPage/DailyReportContainer';

export const DELETE_DAILY_REPORT_MUTATION = gql`
  mutation DELETE_DAILY_REPORT_MUTATION($id: ID!) {
    deleteDailyReport(id: $id) {
      id
    }
  }
`;

class DeleteBtn extends Component {
  handleDelete(deleteDailyReport, report) {
    const { id } = report;
    deleteDailyReport({ variables: { id } });
  }

  render() {
    const { report } = this.props;
    return (
      <Mutation
        mutation={DELETE_DAILY_REPORT_MUTATION}
        update={( store, { data: { deleteDailyReport } }) => {
          const data = store.readQuery({ query: DAILY_REPORTS_QUERY });
          data.userReports = data.userReports.filter(report => report.id !== deleteDailyReport.id);
          store.writeQuery({ query: DAILY_REPORTS_QUERY, data });
        }}
      >
        {(deleteDailyReport, { error }) => {
          { error && <p>Error: {error.message}</p> }

          return (
            <IconBtn>
              <Icon
                bordered
                inverted
                color="red"
                name="trash alternate"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this daily report?')) {
                    this.handleDelete(deleteDailyReport, report);
                  }
                }}
              />
            </IconBtn>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteBtn;
