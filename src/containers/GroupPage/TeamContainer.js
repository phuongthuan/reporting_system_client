import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, Header, Icon, Image } from 'semantic-ui-react';
import AssignMemberToTeamButton from 'components/AssignMemberToTeamButton';
import isEmpty from 'lodash/isEmpty';
import { ContentWrapper } from '../../styles/App';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import history from '../../utils/history';

class TeamContainer extends Component {
  render() {
    const { match } = this.props;
    const { team } = this.props.userData.me;
    if (isEmpty(team)) return <p>error: You don't belong to any team!</p>;

    const { group } = team;
    if (isEmpty(group)) return <p>error: Your team seems not belonging to any Group.</p>;

    const { id: groupId } = group;
    if (match.params.id !== groupId) return <p>error: You are not the leader of this group!</p>;

    return (
      <ContentWrapper>
        <Header as="h3" dividing>
          Teams Management
        </Header>
        <Query
          query={GROUP_MEMBERS_QUERY}
          variables={{
            groupId
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <ErrorMessage error={error} />;

            return (
              <Card.Group centered itemsPerRow={4}>
                {data.group.teams.map(team => (
                  <Card key={team.id}>
                    <Card.Content>
                      <Card.Header as="a" onClick={() => history.push(`/teams/${team.id}`)}>
                        {team.name}
                      </Card.Header>
                      {team.users.map(user => (
                        <div key={user.id}>
                          {user.roles.map(role => role.name).includes('TEAM_LEADER') && (
                            <Image floated="right" size="mini" src={user.avatar} />
                          )}
                          <Card.Meta>{user.name}</Card.Meta>
                        </div>
                      ))}
                      <Card.Description>{team.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      {team.users.length > 0 && (
                        <a
                          onClick={() => history.push(`/teams/${team.id}/members`)}
                          role="link"
                          tabIndex={0}
                        >
                          <Icon name="user" />
                          {team.users.length} Members
                        </a>
                      )}
                      <AssignMemberToTeamButton team={team} />
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            );
          }}
        </Query>
      </ContentWrapper>
    );
  }
}

export const GROUP_MEMBERS_QUERY = gql`
  query GROUP_MEMBERS_QUERY($groupId: ID!) {
    group(where: { id: $groupId }) {
      name
      teams {
        id
        name
        description
        users {
          id
          name
          email
          avatar
          phone
          roles {
            name
          }
          team {
            id
            name
          }
        }
      }
    }
  }
`;

export default TeamContainer;
