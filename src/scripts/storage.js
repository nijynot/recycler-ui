const { network } = require('hardhat');
const { utils } = require('ethers');

async function main() {
  await network.provider.send('hardhat_setStorageAt', [
    '0xa760e26aA76747020171fCF8BdA108dFdE8Eb930',
    utils.solidityKeccak256(
      ['uint256', 'uint256'],
      ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 51]
    ),
    utils.hexZeroPad(utils.parseUnits('100', 18), 32),
  ]);
  await network.provider.send("evm_mine", []);

  const storage = await network.provider.send('eth_getStorageAt', [
    '0xa760e26aA76747020171fCF8BdA108dFdE8Eb930',
    utils.solidityKeccak256(
      ['uint256', 'uint256'],
      ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 51]
    ).toString()
  ]);

  console.log(storage);
  console.log('done!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
