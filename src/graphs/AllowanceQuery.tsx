import { BigNumber } from 'ethers';

export type AllowancePayload = {
  erc20: {
    allowance: BigNumber,
  },
};

export const AllowanceQuery = `query ($erc20: String!, $owner: String! $spender: String!, $connected: Boolean!) {
  erc20(address: $erc20) @include(if: $connected) {
    allowance(owner: $owner, spender: $spender)
  }
}`;
