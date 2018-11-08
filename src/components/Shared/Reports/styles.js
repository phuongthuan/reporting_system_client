import styled from 'react-emotion';
import { Input } from 'semantic-ui-react';

const SearchInput = styled(Input)`
  border-radius: 5px;
  font-size: 1rem;
  width: 33%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ReportsHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 4fr 4fr 4fr 1.5fr 1.5fr;
  background-color: #e5e5e5;
  padding: 1rem 1.5rem;
  height: 60px;
`;

const ReportsRow = styled.div`
  font-size: 1rem;
  display: grid;
  width: 100%;
  grid-template-columns: 0.5fr 1fr 4fr 4fr 4fr 1.5fr 1.5fr;

  padding: 0 1.5rem;
  border-bottom: 1px #a6aaad solid;
  height: 60px;
  align-items: center;

  &:last-child {
    border-bottom: none;
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

export { SearchInput, ReportsHeader, ReportsRow, IconBtn };
