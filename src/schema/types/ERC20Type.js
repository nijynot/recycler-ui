import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import BigNumberType from './BigNumberType';

export default new GraphQLObjectType({
  name: 'ERC20',
  description: 'An ERC20 token.',
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
    balanceOf: {
      type: new GraphQLNonNull(BigNumberType),
      args: {
        account: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (contract, args) => {
        if (args.account) {
          return contract.balanceOf(args.account);
        } else {
          return 0;
        }
      },
    },
    allowance: {
      type: new GraphQLNonNull(BigNumberType),
      args: {
        owner: {
          type: new GraphQLNonNull(GraphQLString),
        },
        spender: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (contract, args) => {
        return contract.allowance(args.owner, args.spender);
      },
    },
  },
});
