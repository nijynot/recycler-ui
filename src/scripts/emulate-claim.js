const { network } = require('hardhat');
const { Contract, utils } = require('ethers');

const TokeVotePool = require('../constants/abis/TokeVotePool.json');

async function main() {
  // const tokeVotePool = new Contract('0xa760e26aA76747020171fCF8BdA108dFdE8Eb930', TokeVotePool, network.provider);
  console.log(network.provider);

  // console.log(await tokeVotePool.balanceOf('0xa15bb66138824a1c7167f5e85b957d04dd34e468'));
  // const value = await network.provider.send('eth_getStorageAt', [
  //   '0xa760e26aA76747020171fCF8BdA108dFdE8Eb930',
  //   utils.solidityKeccak256(
  //     ['address', 'uint256'],
  //     ['0xa15bb66138824a1c7167f5e85b957d04dd34e468', 51]
  //   ),
  // ]);

  // console.log(value);
  // await network.provider.send("evm_mine", []);

  // console.log('Funded 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 with 100 tTOKE.');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
