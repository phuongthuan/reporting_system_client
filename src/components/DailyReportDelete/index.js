import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import queryString from 'query-string';
import { itemsAmount } from 'containers/DailyReportPage/constants';
import isEmpty from 'lodash/isEmpty';
import ModalConfirm from 'components/ModalConfirm';
import { DAILY_REPORTS_QUERY } from '../../containers/DailyReportPage/DailyReportContainer';
import getDailyReportsCacheVariables from '../../utils/getDailyReportsCacheVariables';
import ErrorMessage from '../ErrorMessage';

function updateCacheLoop(store, variables, newVariables) {
  const { skip, first, orderBy } = newVariables;

  const newArg = getDailyReportsCacheVariables(first, skip);
  const arg = getDailyReportsCacheVariables(first, skip - itemsAmount);

  if (store.data.data.ROOT_QUERY[newArg]) {
    const newData = store.readQuery({ query: DAILY_REPORTS_QUERY, variables: newVariables });
    if (isEmpty(newData.userReports.dailyReports)) return;

    const shifted = newData.userReports.dailyReports.shift(); //remove first report from next page
    store.writeQuery({ query: DAILY_REPORTS_QUERY, data: newData, variables: newVariables });

    if (store.data.data.ROOT_QUERY[arg]) {
      const data = store.readQuery({ query: DAILY_REPORTS_QUERY, variables });
      data.userReports.dailyReports.push(shifted); // add removed report to current page
      store.writeQuery({ query: DAILY_REPORTS_QUERY, data, variables });
    }

    const nextVariables = {
      skip: skip + itemsAmount,
      first,
      orderBy
    };
    // move to next loop
    // this loop continues until (store.data.data.ROOT_QUERY[newArg]) becomes false
    updateCacheLoop(store, newVariables, nextVariables);
  }
}

function deleteReportLoopHandler(store, variables, deleteDailyReport) {
  const { skip, first, orderBy } = variables;
  const data = store.readQuery({ query: DAILY_REPORTS_QUERY, variables });
  data.userReports.dailyReports = data.userReports.dailyReports.filter(
    report => report.id !== deleteDailyReport.id
  );
  store.writeQuery({ query: DAILY_REPORTS_QUERY, data, variables });

  const newVariables = {
    skip: skip + itemsAmount,
    first,
    orderBy
  };

  // move to 2nd loop
  updateCacheLoop(store, variables, newVariables);
}

class DailyReportDelete extends Component {
  render() {
    const { id, location, count, updateUserDailyReportsCount } = this.props;
    return (
      <Mutation
        mutation={DELETE_DAILY_REPORT_MUTATION}
        update={(store, { data: { deleteDailyReport } }) => {
          const currentPage = Number(queryString.parse(location.search).page) || 1;
          const skip = currentPage ? (currentPage - 1) * itemsAmount : 0;

          const variables = {
            skip,
            first: itemsAmount,
            orderBy: 'createdAt_DESC'
          };

          deleteReportLoopHandler(store, variables, deleteDailyReport); // call first update loop
          updateUserDailyReportsCount({
            variables: {
              count: count - 1
            }
          });
        }}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteDailyReport: {
            __typename: 'DailyReport',
            id
          }
        }}
      >
        {(deleteDailyReport, { error }) => {
          if (error) return <ErrorMessage error={error} />;

          return <ModalConfirm deleteMutation={deleteDailyReport} id={id} />;
        }}
      </Mutation>
    );
  }
}

export const DELETE_DAILY_REPORT_MUTATION = gql`
  mutation DELETE_DAILY_REPORT_MUTATION($id: ID!) {
    deleteDailyReport(id: $id) {
      id
    }
  }
`;

export default DailyReportDelete;
