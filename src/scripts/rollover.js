const { ethers, network } = require('hardhat');

const RecyclerABI = require('../constants/abis/Recycler.json');

const { utils } = ethers;

async function main() {
  // set our own rewards signer
  await network.provider.send('hardhat_setStorageAt', [
    '0x79dD22579112d8a5F7347c5ED7E609e60da713C5',
    '0x2',
    ethers.utils.hexZeroPad('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 32),
  ]);
  await network.provider.send("evm_mine", []);

  // mint tTOKE to emulate claim
  await network.provider.send('hardhat_setStorageAt', [
    '0xa760e26aA76747020171fCF8BdA108dFdE8Eb930',
    utils.solidityKeccak256(
      ['uint256', 'uint256'],
      ['0xa15bb66138824a1c7167f5e85b957d04dd34e468', 51]
    ),
    utils.hexZeroPad(utils.parseUnits('70', 18), 32),
  ]);
  await network.provider.send("evm_mine", []);

  // fill prev. epoch and create new epoch
  const accounts = await ethers.getSigners();
  const recycler = await ethers.getContractAt(
    RecyclerABI,
    '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
    accounts[9]
  );

  await recycler.fill(1);
  await recycler.next(1644830996);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
