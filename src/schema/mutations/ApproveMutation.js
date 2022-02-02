import { Contract } from '@ethersproject/contracts';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import ERC20 from '../../constants/abis/ERC20.json';
import BigNumberType from '../types/BigNumberType';
import TransactionType from '../types/TransactionType';

const ApproveMutation = {
  type: new GraphQLNonNull(TransactionType),
  args: {
    address: {
      type: new GraphQLNonNull(GraphQLString),
    },
    spender: {
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      type: new GraphQLNonNull(BigNumberType),
    },
  },
  resolve: async (_, args, { provider }) => {
    const token = new Contract(args.address, ERC20, provider);
    return token.connect(provider.getSigner()).approve(args.spender, args.amount);
  },
};

export default ApproveMutation;
