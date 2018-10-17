import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { SidebarElement, SidebarElementSelected } from './styles';

const Element = ({ icon, text, pathname, link }) => {
  const El = pathname === link ? SidebarElementSelected : SidebarElement;
  return (
    <Link to={link}>
      <El>
        <p>
          <Icon name={icon} />
          {text}
        </p>
      </El>
    </Link>
  );
};

export default Element;
