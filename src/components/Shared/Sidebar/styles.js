import styled from 'react-emotion';

const SidebarWrapper = styled.div`
  font-size: 16px;
  background-color: #3a405a;
  width: 300px;
  height: 100vh;
  float: left;
`;

const SidebarElement = styled.div`
  background-color: #3a405a;
  width: 100%;
  height: 80px;
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
  width: 100%;
  height: 300px;
  position: relative;
`;

const SidebarIcon = styled.div`
  width: 230px;
  height: 230px;

  position: absolute;
  top: 45%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
`;

const SidebarUserName = styled.div`
  margin-top: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export {
  SidebarWrapper,
  SidebarElement,
  SidebarElementSelected,
  SidebarIconArea,
  SidebarIcon,
  SidebarUserName
};
