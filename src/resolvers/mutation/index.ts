import GMR from '@wiicamp/graphql-merge-resolvers';
import resolversUserMutation from './user';

const mutationResolvers = GMR.merge({
    resolversUserMutation
});

export default mutationResolvers;