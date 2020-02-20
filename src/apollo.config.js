import ApolloClient from 'apollo-boost';

const httpUrl = `http://${ process.env.REACT_APP_HASURA_ENDPOINT }`;

const client = new ApolloClient({
  uri: `${httpUrl}/v1/graphql`,
});

export {
  client
};
