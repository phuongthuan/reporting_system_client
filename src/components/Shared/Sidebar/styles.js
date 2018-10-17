import styled from 'react-emotion';

const SidebarWrapper = styled.div`
  font-size: 0.7rem;
  background-color: #3a405a;
  height: 100vh;
  max-width: 300px;
  min-width: 220px;
  flex-grow: 1;

  @media (max-width: 780px) {
    display: none;
  }
`;

const SidebarElement = styled.div`
  background-color: #3a405a;
  width: 100%;
  height: 8vh;
  min-height: 60px;
  color: #fff;
  display: table;

  p {
    padding: 0 20px;
    display: table-cell;
    vertical-align: middle;
  }
`;

const SidebarElementSelected = styled(SidebarElement)`
  background-color: #4b5275;
`;

const SidebarIconArea = styled.div`
  padding: 20px;
  width: 100%;
`;

const SidebarIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
`;

const SidebarUserName = styled.div`
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 0.6rem;
`;

const Profile = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const EditProfile = styled.div`
  color: #a6aaad;
`;

export {
  SidebarWrapper,
  SidebarElement,
  SidebarElementSelected,
  SidebarIconArea,
  SidebarIcon,
  SidebarUserName,
  Profile,
  EditProfile
};
