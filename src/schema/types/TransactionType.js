import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import BigNumberType from './BigNumberType';

export default new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    hash: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (tx) => {
        return tx.hash;
      },
    },
    to: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (tx) => {
        return tx.to;
      },
    },
    from: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (tx) => {
        return tx.from;
      },
    },
    nonce: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (tx) => {
        return tx.nonce;
      },
    },
    gasLimit: {
      type: new GraphQLNonNull(BigNumberType),
      resolve: async (tx) => {
        return tx.gasLimit;
      },
    },
    gasPrice: {
      type: new GraphQLNonNull(BigNumberType),
      resolve: async (tx) => {
        return tx.gasPrice;
      },
    },
    maxFeePerGas: {
      type: BigNumberType,
      resolve: async (tx) => {
        return tx.maxFeePerGas;
      },
    },
    data: {
      type: GraphQLString,
      resolve: async (tx) => {
        return tx.data;
      },
    },
    value: {
      type: BigNumberType,
      resolve: async (tx) => {
        return tx.value;
      },
    },
    chainId: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (tx) => {
        return tx.chainId;
      },
    },
  },
});
