import { BigNumber } from 'ethers';

export type VaultPayload = {
  vault: {
    balanceOf: BigNumber;
  },
  tTOKE: {
    balanceOf: BigNumber;
  },
  retTOKE: {
    balanceOf: BigNumber;
  },
  recycler: {
    capacity: BigNumber;
    dust: BigNumber;
    totalSupply: BigNumber;
    totalCoins: BigNumber;
    queuedOf?: BigNumber;
  },
};

export const VaultQuery = `query(
  $erc20: String!,
  $vault: String!,
  $recycler: String!,
  $account: String!,
  $connected: Boolean!
) {
  vault: erc20(address: $erc20) {
    balanceOf(account: $vault)
  }

  tTOKE: erc20(address: $erc20) @include(if: $connected) {
    balanceOf(account: $account)
  }
  retTOKE: erc20(address: $recycler) @include(if: $connected) {
    balanceOf(account: $account)
  }
  recycler {
    capacity
    dust
    totalSupply
    totalCoins
    queuedOf(account: $account) @include(if: $connected)
  }
}`;
