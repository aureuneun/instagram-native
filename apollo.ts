import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';

const TOKEN = 'token';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar('');
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://instagram-now.herokuapp.com/graphql'
      : 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'wss://instagram-now.herokuapp.com/graphql'
      : 'ws://localhost:4000/graphql',
  options: {
    connectionParams: () => ({
      Authorization: tokenVar(),
    }),
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log('Network Error', networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
    User: {
      keyFields: (obj) => `User:${obj.username}`,
    },
  },
});

const httpLink = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
