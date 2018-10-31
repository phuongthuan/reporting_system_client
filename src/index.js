import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { withClientState } from 'apollo-link-state';
import { USER_DAILY_REPORTS_COUNT_QUERY } from 'containers/DailyReportPage/DailyReportContainer';

import App from 'containers/App';
import history from './utils/history';

import 'semantic-ui-css/semantic.min.css';
import './ress.min.css';
// import './common.style';

const httpUri =
  process.env.NODE_ENV === 'production'
    ? 'Set uri for production here'
    : process.env.REACT_APP_GRAPHQL_URI;

const httpLink = new HttpLink({
  credentials: 'include',
  uri: httpUri
});

const wsUri =
  process.env.NODE_ENV === 'production'
    ? 'Set uri for production here'
    : process.env.REACT_APP_WS_URI;

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const defaultState = {
  userDailyReportsCount: {
    __typename: 'UserDailyReportsCount',
    count: 0,
    isInitialized: false
  }
};

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateUserDaiyReportsCount: (_, { count }, { cache }) => {
        const previousState = cache.readQuery({ query: USER_DAILY_REPORTS_COUNT_QUERY });
        if (previousState.userDailyReportsCount.isInitialized === true) return null;

        const data = {
          ...previousState,
          userDailyReportsCount: {
            __typename: 'UserDailyReportsCount',
            count,
            isInitialized: true
          }
        };

        cache.writeData({ query: USER_DAILY_REPORTS_COUNT_QUERY, data });
        return null;
      }
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, link])
});

ReactDOM.render(
  <Router history={history}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
