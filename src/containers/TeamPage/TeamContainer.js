import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, Header, Icon, Image } from 'semantic-ui-react';
import { ContentWrapper } from '../../styles/App';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import history from '../../utils/history';

class TeamContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <ContentWrapper>
        <Header as="h3" dividing>
          Teams Management
        </Header>
        <Query query={TEAMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;

            if (error) return <ErrorMessage error={error} />;

            return (
              <Fragment>
                <Card.Group centered itemsPerRow={4}>
                  {data.teams.map(team => (
                    <Card raised key={team.id}>
                      <Card.Content>
                        <Card.Header as="a" onClick={() => history.push(`${match.url}/${team.id}`)}>
                          {team.name}
                        </Card.Header>
                        {team.users.map(user => {
                          const rolesArray = user.roles.map(role => role.name);
                          rolesArray.filter(role => role === 'TEAM_LEADER');
                          return (
                            <div key={user.id}>
                              <Image floated="right" size="mini" src={user.avatar} />
                              <Card.Meta>{user.name}</Card.Meta>
                            </div>
                          );
                        })}
                        <Card.Description>{team.description}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <a>
                          <Icon name="user" />
                          {team.users.length} Members
                        </a>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Fragment>
            );
          }}
        </Query>
      </ContentWrapper>
    );
  }
}

const TEAMS_QUERY = gql`
  query TEAMS_QUERY {
    teams {
      id
      name
      description
      users {
        id
        name
        avatar
        roles {
          name
        }
      }
    }
  }
`;

export default TeamContainer;
