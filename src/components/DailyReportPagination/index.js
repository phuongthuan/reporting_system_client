import React from 'react'
import { Icon, Pagination } from 'semantic-ui-react'
import styled from 'react-emotion';
import {itemsAmount} from '../../containers/DailyReportPage/constants';
import history from '../../utils/history';

const PaginationStyles = styled.div`
  margin-top: 1em;
`;

class DailyReportPagination extends React.Component {

  handlePaginationChange = (e, { activePage }) => history.push(`/reports?page=${activePage}`);

  render() {
    const count = this.props.data.dailyReports.count;
    const { currentPage } = this.props;
    const totalPages = Math.ceil(count / itemsAmount);
    return (
      <PaginationStyles>
        <Pagination
          defaultActivePage={currentPage}
          onPageChange={this.handlePaginationChange}
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
          prevItem={{ content: <Icon name='angle left' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true }}
          totalPages={totalPages}
        />
      </PaginationStyles>
    );
  }
}

export default DailyReportPagination
