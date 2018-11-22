import styled from 'react-emotion';

const ProjectListHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 2fr 2fr 0.5fr;
  background-color: #e5e5e5;
  padding: 1rem 1.5rem;
  height: 60px;
`;

const ProjectListRow = styled.div`
  font-size: 1rem;
  display: grid;
  width: 100%;
  grid-template-columns: 0.5fr 2fr 2fr 2fr 0.5fr;

  padding: 0 1.5rem;
  border-bottom: 1px #a6aaad solid;
  height: 60px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export { ProjectListHeader, ProjectListRow };
