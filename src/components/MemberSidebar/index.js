import React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import {
  SidebarWrapper,
  SidebarIconArea,
  SidebarIcon,
  SidebarUserName,
  Profile,
  EditProfile
} from 'components/Shared/Sidebar/styles';
import Element from 'components/Shared/Sidebar/Element';

const items = [
  {
    id: 1,
    icon: 'pencil alternate',
    text: 'Write a Daily Report',
    link: '/member/daily_reports/new'
  },
  {
    id: 2,
    icon: 'copy outline',
    text: 'Your Daily Reports',
    link: '/member/daily_reports'
  },
  {
    id: 3,
    icon: 'sign out alternate',
    text: 'Sign out',
    link: '/'
  }
];

const MemberSidebar = ({ pathname }) => (
  <SidebarWrapper>
    <SidebarIconArea>
      <SidebarIcon>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
          circular
          size="tiny"
        />
      </SidebarIcon>
      <Profile>
        <SidebarUserName>Matsumoto Yuji</SidebarUserName>
        <Link to="/member/profile/edit">
          <EditProfile>
            <Icon name="setting" />
            edit profile
          </EditProfile>
        </Link>
      </Profile>
    </SidebarIconArea>

    {items.map(item => (
      <Element
        key={item.id}
        icon={item.icon}
        text={item.text}
        pathname={pathname}
        link={item.link}
      />
    ))}
  </SidebarWrapper>
);

export default MemberSidebar;
