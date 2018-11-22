import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Icon, Image } from 'semantic-ui-react';
import Spinner from 'components/Spinner';
import ProjectDelete from 'components/ProjectDelete';
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
    <Query query={ALL_PROJECTS_QUERY}>
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
                <ContentsRowColumn>{idx}</ContentsRowColumn>
                <ContentsRowColumn onClick={() => history.push(`/projects/${project.id}`)}>
                  <a>{project.title}</a>
                </ContentsRowColumn>
                <ContentsRowColumn>
                  <Image src={project.teamLeader.avatar} size="mini" avatar />
                  {project.teamLeader.name}
                </ContentsRowColumn>
                <ContentsRowColumn>
                  {project.members.map(member => (
                    <span key={member.id}>{member.name} </span>
                  ))}
                </ContentsRowColumn>
                <ContentsRowColumn>
                  <IconBtn>
                    <Icon
                      name="edit"
                      bordered
                      onClick={() => history.push(`projects/${project.id}/edit`)}
                    />
                  </IconBtn>

                  <ProjectDelete />
                </ContentsRowColumn>
              </ProjectListRow>
            ))}
          </ContentsTable>
        );
      }}
    </Query>
  </ContentWrapper>
);

const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY {
    projects {
      id
      title
      teamLeader {
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
