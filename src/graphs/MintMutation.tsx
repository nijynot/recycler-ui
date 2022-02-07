export const MintMutation = `mutation ($amount: BigNumber!) {
  tx: mint(amount: $amount) {
    hash
  }
}`;
