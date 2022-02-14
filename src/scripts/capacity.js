const { ethers, network } = require('hardhat');

const RecyclerABI = require('../constants/abis/Recycler.json');

const { BigNumber, utils } = ethers;

async function main() {
  const accounts = await ethers.getSigners();
  const recycler = await ethers.getContractAt(
    RecyclerABI,
    '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
    accounts[9]
  );

  // console.log(await recycler.capacity());
  await recycler.setCapacity(BigNumber.from(10).pow(18).mul(100));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
