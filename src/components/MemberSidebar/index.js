import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

import {
  SidebarWrapper,
  SidebarIconArea,
  SidebarIcon,
  SidebarUserName
} from 'components/Shared/Sidebar/styles';
import Element from 'components/Shared/Sidebar/Element';

const items = [
  {
    icon: 'pencil alternate',
    text: 'Write a Daily Report'
  },
  {
    icon: 'copy outline',
    text: 'Your Daily Reports'
  },
  {
    icon: 'address card outline',
    text: 'Edit Profile'
  },
  {
    icon: 'sign out alternate',
    text: 'Sign out'
  }
];

class MemberSidebar extends Component {
  render() {
    const { targetText } = this.props;
    return (
      <SidebarWrapper>
        <SidebarIconArea>
          <SidebarIcon>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              circular
            />
            <SidebarUserName>Familyname Firstname</SidebarUserName>
          </SidebarIcon>
        </SidebarIconArea>

        {items.map(item => (
          <Element icon={item.icon} text={item.text} targetText={targetText} />
        ))}
      </SidebarWrapper>
    );
  }
}

export default MemberSidebar;
