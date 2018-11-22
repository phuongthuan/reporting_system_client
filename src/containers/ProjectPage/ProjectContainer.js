import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import ProjectListing from 'components/ProjectListing';
import { ContentWrapper } from '../../styles/App';

const CreateProjectContainer = () => (
  <ContentWrapper>
    <Header>Projects List</Header>
    <Divider />
    <ProjectListing />
  </ContentWrapper>
);

export default CreateProjectContainer;
