export const BurnMutation = `mutation ($amount: BigNumber!) {
  tx: burn(amount: $amount) {
    hash
  }
}`;
