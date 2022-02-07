export const ApproveMutation = `mutation ($address: String!, $spender: String!, $amount: BigNumber!) {
  tx: approve(address: $address, spender: $spender, amount: $amount) {
    hash
  }
}`;
