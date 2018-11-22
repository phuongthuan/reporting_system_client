import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import ProjectFormUpdate from 'components/ProjectFormUpdate';
import { ContentWrapper } from '../../styles/App';

const EditProjectContainer = props => (
  <ContentWrapper>
    <Header>Edit Project</Header>
    <Divider />
    <ProjectFormUpdate {...props} />
  </ContentWrapper>
);

export default EditProjectContainer;
