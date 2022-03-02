import { Contract, ContractInterface } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import ERC20ABI from '../constants/abis/ERC20.json';
import RecyclerVaultV1 from '../constants/abis/RecyclerVaultV1.json';
import { getAddressList } from '../constants';
import { useAccount, useProvider } from 'wagmi';

export type VaultData = {
  vault: {
    totalAssets: BigNumber;
    capacity: BigNumber;
    fee: BigNumber;
    status: boolean;
  },
  account: {
    balanceOfToke: BigNumber;
    balanceOfReToke: BigNumber;
    assetsOf: BigNumber;
    requestOf: {
      cycle: BigNumber;
      assets: BigNumber;
    };
    maxDeposit: BigNumber;
    maxRequest: BigNumber;
    maxWithdraw: BigNumber;
  },
};

export function useVaultData() {
  const [data, setData] = useState<VaultData>();

  const provider = useProvider();
  const [{ data: account }] = useAccount();

  const toke = new Contract(getAddressList().Toke, ERC20ABI, provider);
  const recycler = new Contract(getAddressList().RecyclerProxy, RecyclerVaultV1 as ContractInterface, provider);

  const call = async () => {
    const resolve = await Promise.all([
      recycler.totalAssets(),
      recycler.capacity(),
      recycler.fee(),
      recycler.status(),
      account && toke.balanceOf(account?.address),
      account && recycler.maxDeposit(account?.address),
      account && recycler.maxRequest(account?.address),
      account && recycler.balanceOf(account?.address),
      account && recycler.assetsOf(account?.address),
      account && recycler.maxWithdraw(account?.address),
      account && recycler.requestOf(account?.address),
    ]);

    const returndata = {
      vault: {
        totalAssets: resolve[0],
        capacity: resolve[1],
        fee: resolve[2],
        status: resolve[3],
      },
      account: {
        balanceOfToke: resolve[4],
        balanceOfReToke: resolve[7],
        assetsOf: resolve[8],
        requestOf: resolve[10],
        maxDeposit: resolve[5],
        maxRequest: resolve[6],
        maxWithdraw: resolve[9],
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address]);

  return { data, refetch: call };
}
