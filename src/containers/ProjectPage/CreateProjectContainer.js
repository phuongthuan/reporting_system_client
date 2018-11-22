import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import ProjectFormCreate from 'components/ProjectFormCreate';
import { ContentWrapper } from '../../styles/App';

const CreateProjectContainer = () => (
  <ContentWrapper>
    <Header>New Project</Header>
    <Divider />
    <ProjectFormCreate />
  </ContentWrapper>
);

export default CreateProjectContainer;
