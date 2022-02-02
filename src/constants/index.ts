import ADDRESSES from './addresses.json';

export const SUPPORTED_CHAINS = [1, 31337];

export const isSupportedChain = (chainId: number) => {
  if (SUPPORTED_CHAINS.includes(chainId)) {
    return true;
  } else {
    return false;
  }
};

type Addresses = {
  [chainId: string]: any,
};

export const getAddresses = (chainId: number) => {
  if (process.env.REACT_APP_NODE_ENV === 'production') {
    if (!chainId) {
      return ADDRESSES[1];
    } else {
      return (ADDRESSES as Addresses)[chainId];
    }
  } else {
    if (!chainId) {
      return ADDRESSES[31337];
    } else {
      return (ADDRESSES as Addresses)[chainId];
    }
  }
}
