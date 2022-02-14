import { BigNumber } from 'ethers';

import ADDRESS_LIST from './lists/AddressList.json';
import CHAIN_ID_LIST from './lists/ChainIdList.json';

export const UNIT = BigNumber.from(10).pow(18);

export const isSupportedChain = (chainId: number) => {
  if (process.env.NODE_ENV === 'production') {
    return [1].includes(chainId);
  } else {
    if (CHAIN_ID_LIST.includes(chainId)) {
      return true;
    } else {
      return false;
    }
  }
};

export const getAddressList = (chainId?: number) => {
  type AddressList = {
    [chainId: string]: any,
  };

  if (process.env.NODE_ENV === 'production') {
    if (!chainId) {
      return ADDRESS_LIST[1];
    } else {
      return (ADDRESS_LIST as AddressList)[chainId];
    }
  } else {
    if (!chainId) {
      return ADDRESS_LIST[1337];
    } else {
      return (ADDRESS_LIST as AddressList)[chainId];
    }
  }
}
