import styled from 'react-emotion';
import { Input } from 'semantic-ui-react';

const SearchInput = styled(Input)`
  border-radius: 5px;
  font-size: 16px;
  margin-top: 40px;
  width: 33%;
`;

const ReportsTable = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #a6aaad;
`;

const ReportsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1fr 1fr;
  background-color: #e5e5e5;
  padding: 20px 40px;
  height: 60px;
`;

const ReportsHeaderColumn = styled.div`
  font-weight: bold;
`;

const ReportsRow = styled.div`
  font-size: 16px;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 3fr 1fr 1fr;
  padding: 0 40px;
  border-bottom: 1px #a6aaad solid;
  height: 60px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const ReportsRowColumn = styled.div`
  font-size: 16px;
`;

const IssueTag = styled.button`
  font-size: 14px;
  background-color: #cbefff;
  color: #0facf3;
  border-radius: 5px;
  margin-right: 10px;
  padding: 2px 4px;
  font-weight: bold;

  &:last-child {
    margin: none;
  }
`;

const IconBtn = styled.div`
  padding: 5px;
  height: 36px;
  width: 36px;
  display: inline-block;
  margin-right: 10px;
  line-height: 18px;
  text-align: center;
`;

export {
  SearchInput,
  ReportsTable,
  ReportsHeader,
  ReportsHeaderColumn,
  ReportsRow,
  ReportsRowColumn,
  IssueTag,
  IconBtn
};
