import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Icon, Image } from 'semantic-ui-react';
import Spinner from 'components/Spinner';
import ProjectDelete from 'components/ProjectDelete';
import isEmpty from 'lodash/isEmpty';
import ErrorMessage from '../ErrorMessage';
import { ContentWrapper } from '../../styles/App';
import {
  ContentsTable,
  ContentsHeaderColumn,
  ContentsRowColumn,
  IconBtn
} from '../../styles/ContentsTable';
import { ProjectListHeader, ProjectListRow } from '../../styles/ProjectList';
import history from '../../utils/history';

const headerItems = ['No', 'title', 'team leader', 'members', 'actions'];

const ProjectListing = () => (
  <ContentWrapper>
    <Query query={ALL_PROJECTS_QUERY} variables={variables}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage error={error} />;

        return (
          <ContentsTable>
            <ProjectListHeader>
              {headerItems.map(item => (
                <ContentsHeaderColumn key={item}>{item}</ContentsHeaderColumn>
              ))}
            </ProjectListHeader>

            {data.projects.map((project, idx) => (
              <ProjectListRow key={project.id}>
                <ContentsRowColumn>{idx + 1}</ContentsRowColumn>
                <ContentsRowColumn onClick={() => history.push(`/projects/${project.id}`)}>
                  <a>{project.title}</a>
                </ContentsRowColumn>
                <ContentsRowColumn>
                  {project.teamLeader ? (
                    <Fragment>
                      <Image src={project.teamLeader.avatar} size="mini" avatar />
                      {project.teamLeader.name}
                    </Fragment>
                  ) : (
                    <p>No teamLeader assignend</p>
                  )}
                </ContentsRowColumn>
                <ContentsRowColumn>
                  {!isEmpty(project.members) ? (
                    project.members.map(member => <span key={member.id}>{member.name} </span>)
                  ) : (
                    <p>No members assigned</p>
                  )}
                </ContentsRowColumn>
                <ContentsRowColumn>
                  <IconBtn>
                    <Icon
                      name="edit"
                      bordered
                      onClick={() => history.push(`projects/${project.id}/edit`)}
                    />
                  </IconBtn>

                  <ProjectDelete id={project.id} />
                </ContentsRowColumn>
              </ProjectListRow>
            ))}
          </ContentsTable>
        );
      }}
    </Query>
  </ContentWrapper>
);

export const variables = {
  orderBy: 'createdAt_DESC'
};

export const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY($orderBy: ProjectOrderByInput) {
    projects(orderBy: $orderBy) {
      id
      title
      teamLeader {
        id
        name
        avatar
      }
      members {
        id
        name
      }
    }
  }
`;

export default ProjectListing;
