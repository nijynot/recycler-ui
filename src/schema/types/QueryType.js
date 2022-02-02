
import { Contract } from '@ethersproject/contracts';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import ERC20ABI from '../../constants/abis/ERC20.json';
import RecyclerABI from '../../constants/abis/Recycler.json';
import { getAddressList } from '../../constants';

import ERC20Type from './ERC20Type';
import RecyclerType from './RecyclerType';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root query type.',
  fields: {
    erc20: {
      type: new GraphQLNonNull(ERC20Type),
      args: {
        address: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, args, { provider }) => {
        return new Contract(args.address, ERC20ABI, provider);
      },
    },
    recycler: {
      type: new GraphQLNonNull(RecyclerType),
      resolve: async (_, args, { provider, chainId }) => {
        return new Contract(getAddressList(chainId).Recycler, RecyclerABI, provider);
      },
    },
  },
});
