import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'components/Spinner';
import { Header, Image } from 'semantic-ui-react';
import uuidv1 from 'uuid/v1';
import { ContentWrapper } from '../../styles/App';
import { MemberListHeader, MemberListRow, RoleTag } from '../../styles/MemberList';
import { ContentsTable, ContentsHeaderColumn, ContentsRowColumn } from '../../styles/ContentsTable';
import ErrorMessage from '../../components/ErrorMessage';

const headerItems = ['No', 'avatar', 'name', 'email', 'phone', 'roles'];

class MemberListContainer extends Component {
  render() {
    const { match } = this.props;
    const { id: teamId } = match.params;

    return (
      <ContentWrapper>
        <Header as="h3" dividing>
          Team Member List
        </Header>
        <Query
          query={TEAM_MEMBERS_QUERY}
          variables={{
            teamId
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <ErrorMessage error={error} />;

            return (
              <ContentsTable>
                <MemberListHeader>
                  {headerItems.map(item => (
                    <ContentsHeaderColumn key={item}>{item}</ContentsHeaderColumn>
                  ))}
                </MemberListHeader>

                {data.users.map((user, i) => (
                  <MemberListRow key={user.id}>
                    <ContentsRowColumn>{i + 1}</ContentsRowColumn>
                    <ContentsRowColumn>
                      <Image src={user.avatar} size="mini" avatar />
                    </ContentsRowColumn>
                    <ContentsRowColumn>{user.name}</ContentsRowColumn>
                    <ContentsRowColumn>{user.email}</ContentsRowColumn>
                    <ContentsRowColumn>{user.phone}</ContentsRowColumn>
                    <ContentsRowColumn>
                      {user.roles.map(role => (
                        <RoleTag key={uuidv1()}>{role.name}</RoleTag>
                      ))}
                    </ContentsRowColumn>
                  </MemberListRow>
                ))}
              </ContentsTable>
            );
          }}
        </Query>
      </ContentWrapper>
    );
  }
}

const TEAM_MEMBERS_QUERY = gql`
  query TEAM_MEMBERS_QUERY($teamId: ID!) {
    users(where: { team: { id: $teamId } }) {
      id
      avatar
      name
      email
      phone
      roles {
        name
      }
    }
  }
`;

export default MemberListContainer;
