import 'graphql-import-node';
import typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import resolvers from '../resolvers/index';


const schema: GraphQLSchema = makeExecutableSchema({
    resolvers,
    typeDefs,
    resolverValidationOptions: {
        requireResolversForResolveType: undefined
    }
});

export default schema;