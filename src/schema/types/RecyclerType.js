import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import BigNumberType from './BigNumberType';

export default new GraphQLObjectType({
  name: 'Recycler',
  description: 'The Recycler contract.',
  fields: {
    name: {
      type: GraphQLString,
      resolve: async (contract) => {
        return contract.name();
      },
    },
    symbol: {
      type: GraphQLString,
      resolve: async (contract) => {
        return contract.symbol();
      },
    },
    decimals: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (contract) => {
        return contract.decimals();
      },
    },
    capacity: {
      type: new GraphQLNonNull(BigNumberType),
      resolve: async (contract) => {
        return contract.capacity();
      },
    }
  },
});
