import { Contract } from '@ethersproject/contracts';
import { GraphQLNonNull } from 'graphql';
import { getAddressList } from '../../constants';

import Recycler from '../../constants/abis/Recycler.json';
import BigNumberType from '../types/BigNumberType';
import TransactionType from '../types/TransactionType';

const BurnMutation = {
  type: new GraphQLNonNull(TransactionType),
  args: {
    amount: {
      type: new GraphQLNonNull(BigNumberType),
    },
  },
  resolve: async (_, args, { provider, signer }) => {
    const contract = new Contract(getAddressList().Recycler, Recycler, provider);
    const self = await signer.getAddress();

    return contract.connect(signer).burn(self, self, args.amount);
  },
};

export default BurnMutation;
