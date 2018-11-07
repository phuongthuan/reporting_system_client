import styled from 'react-emotion';

const TeamReportsHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 4fr 4fr 4fr 2fr 1.5fr;
  background-color: #e5e5e5;
  padding: 1rem 1.5rem;
  height: 60px;
`;

const TeamReportsRow = styled.div`
  font-size: 1rem;
  display: grid;
  width: 100%;
  grid-template-columns: 0.5fr 1fr 4fr 4fr 4fr 2fr 1.5fr;

  padding: 0 1.5rem;
  border-bottom: 1px #a6aaad solid;
  height: 60px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export { TeamReportsHeader, TeamReportsRow };
