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

export { ContentsTable, ContentsHeaderColumn, ContentsRowColumn, IconBtn };
