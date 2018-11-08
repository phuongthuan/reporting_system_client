import styled from 'react-emotion';

const MemberListHeader = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.2fr 0.5fr 1fr 0.5fr 1fr;
  background-color: #e5e5e5;
  padding: 1rem 1.5rem;
  height: 60px;
`;

const MemberListRow = styled.div`
  font-size: 1rem;
  display: grid;
  width: 100%;
  grid-template-columns: 0.2fr 0.2fr 0.5fr 1fr 0.5fr 1fr;

  padding: 0 1.5rem;
  border-bottom: 1px #a6aaad solid;
  height: 60px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const RoleTag = styled.button`
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
`;

export { MemberListHeader, MemberListRow, RoleTag };
