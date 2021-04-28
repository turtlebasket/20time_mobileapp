import { ApolloClient, gql, InMemoryCache, useApolloClient, useQuery } from '@apollo/client';
import appConfig from './AppConfig';

const apolloClient = new ApolloClient({
  uri: appConfig.apiConnect,
  cache: new InMemoryCache(), // consider switching to something else
})

function apolloGet(queryStr: string) {
  const response = useQuery(gql(queryStr), {client: useApolloClient(), notifyOnNetworkStatusChange: true});
  return response.data
}

export { apolloClient, apolloGet };