import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ContentWrapper } from '../../styles/App';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

class TeamDetailContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Query query={TEAMS_LIST_QUERY} variables={{ id: this.props.match.params.id }}>
          {({ data, loading, error }) => {
            if (loading) {
              return <Spinner />;
            }

            if (error) return <ErrorMessage error={error} />;

            console.log(data.team);

            return <p>In this page. We will show the daily reports table and members table.</p>;
          }}
        </Query>
      </ContentWrapper>
    );
  }
}

const TEAMS_LIST_QUERY = gql`
  query TEAMS_LIST_QUERY($id: ID!) {
    team(where: { id: $id }) {
      id
      name
      description
    }
  }
`;

export default TeamDetailContainer;
