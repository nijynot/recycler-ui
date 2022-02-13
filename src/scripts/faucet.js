const { network } = require('hardhat');
const { utils } = require('ethers');

async function main() {
  await network.provider.send('hardhat_setStorageAt', [
    '0xa760e26aA76747020171fCF8BdA108dFdE8Eb930',
    utils.solidityKeccak256(
      ['uint256', 'uint256'],
      ['0xbcd4042de499d14e55001ccbb24a551f3b954096', 51]
    ),
    utils.hexZeroPad(utils.parseUnits('100', 18), 32),
  ]);
  await network.provider.send("evm_mine", []);

  console.log('Funded 0xbcd4042de499d14e55001ccbb24a551f3b954096 with 100 tTOKE.');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
