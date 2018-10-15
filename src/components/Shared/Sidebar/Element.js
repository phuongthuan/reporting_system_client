import React from 'react';
import { Icon } from 'semantic-ui-react';

import { SidebarElement, SidebarElementSelected } from './styles';

const Element = ({ icon, text, targetText }) => {
  const El = targetText === text ? SidebarElementSelected : SidebarElement;
  return (
    <El>
      <p>
        <Icon name={icon} />
        {text}
      </p>
    </El>
  );
};

export default Element;
