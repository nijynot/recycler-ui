import { Contract, ContractInterface } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import ERC20ABI from '../constants/abis/ERC20.json';
import RecyclerABI from '../constants/abis/Recycler.json';
import { getAddressList } from '../constants';
import { useAccount, useProvider } from 'wagmi';

export type VaultData = {
  vault: {
    totalSupply: BigNumber;
    dust: BigNumber;
    capacity: BigNumber;
    rotating: boolean;
    cursor: BigNumber;
  },
  account: {
    balanceOftTOKE: BigNumber;
    balanceOfretTOKE: BigNumber;
    queuedOftTOKE: BigNumber;
    epoch: BigNumber;
  },
};

export function useVaultData() {
  const [data, setData] = useState<VaultData>();

  const provider = useProvider();
  const [{ data: account }] = useAccount();

  const tTOKE = new Contract(getAddressList().TokeVotePool, ERC20ABI, provider);
  const recycler =  new Contract(getAddressList().Recycler, RecyclerABI as ContractInterface, provider);

  const call = async () => {
    const resolve = await Promise.all([
      await recycler.totalSupply(),
      await recycler.dust(),
      await recycler.capacity(),
      account && await tTOKE.balanceOf(account?.address),
      account && await recycler.balanceOf(account?.address),
      account && await recycler.queuedOf(account?.address),
      await recycler.rotating(),
      await recycler.cursor(),
      account && await recycler.bufferOf(account?.address),
    ]);

    const returndata = {
      vault: {
        totalSupply: resolve[0],
        dust: resolve[1],
        capacity: resolve[2],
        rotating: resolve[6],
        cursor: resolve[7],
      },
      account: {
        balanceOftTOKE: resolve[3],
        balanceOfretTOKE: resolve[4],
        queuedOftTOKE: resolve[5],
        epoch: resolve[8] ? BigNumber.from(resolve[8].epoch) : BigNumber.from(0),
      },
    };

    setData(returndata);
  };

  useEffect(() => {
    try {
      call();
    } catch (e) {
      console.error(e);
    }
  }, [account?.address]);

  return { data, refetch: call };
}
