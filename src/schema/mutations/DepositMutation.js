import { Contract } from '@ethersproject/contracts';
import { GraphQLNonNull } from 'graphql';
import { getAddressList } from '../../constants';

import RecyclerManager from '../../constants/abis/RecyclerManager.json';
import BigNumberType from '../types/BigNumberType';
import TransactionType from '../types/TransactionType';

const DepositMutation = {
  type: new GraphQLNonNull(TransactionType),
  args: {
    amount: {
      type: new GraphQLNonNull(BigNumberType),
    },
  },
  resolve: async (_, args, { provider, signer }) => {
    const contract = new Contract(getAddressList().RecyclerManager, RecyclerManager, provider);
    return contract.connect(signer).mint(await signer.getAddress(), args.amount);
  },
};

export default DepositMutation;
