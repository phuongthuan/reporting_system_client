import styled from 'react-emotion';

const ContentsTable = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #a6aaad;
`;

const ContentsHeaderColumn = styled.div`
  margin-right: 0.2rem;
  font-size: 1rem;
  font-weight: bold;
`;

const ContentsRowColumn = styled.div`
  margin-right: 0.5rem;
  font-size: 1rem;

  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  a {
    cursor: pointer;
  }
`;

export { ContentsTable, ContentsHeaderColumn, ContentsRowColumn };
