import styled from 'react-emotion';
import { Input } from 'semantic-ui-react';

const SearchInput = styled(Input)`
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 40px;
  width: 33%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ReportsTable = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #a6aaad;
`;

const ReportsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 4fr 4fr 2fr;
  background-color: #e5e5e5;
  padding: 1rem 1.5rem;
  height: 60px;
`;

const ReportsHeaderColumn = styled.div`
  margin-right: 0.2rem;
  font-size: 1rem;
  font-weight: bold;
`;

const ReportsRow = styled.div`
  font-size: 1rem;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 4fr 4fr 4fr 2fr;

  padding: 0 1.5rem;
  border-bottom: 1px #a6aaad solid;
  height: 60px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const ReportsRowColumn = styled.div`
  margin-right: 0.2rem;
  font-size: 1rem;
`;

const IssueTag = styled.button`
  font-size: 0.5rem;
  background-color: #cbefff;
  color: #0facf3;
  border-radius: 5px;
  margin: 0.08rem;
  padding: 0.08rem;
  font-weight: bold;

  &:last-child {
    margin: none;
  }

  @media (max-width: 1024px) {
    padding: 0;
    font-size: 0.2rem;
  }
`;

const IconBtn = styled.div`
  font-size: 0.6rem;
  padding: 0.2rem;
  display: inline-block;
  line-height: 1rem;
  cursor: pointer;

  @media (max-width: 1024px) {
    padding: 0;
    font-size: 0.2rem;
  }
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
