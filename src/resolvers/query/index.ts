import GMR from '@wiicamp/graphql-merge-resolvers';
import resolversUserQuery from './user';
import resolversProductsQuery from './product';

const queryResolvers = GMR.merge({
    resolversUserQuery,
    resolversProductsQuery
});

export default queryResolvers;