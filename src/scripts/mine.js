const { network } = require('hardhat');

async function main() {
  await network.provider.send("evm_mine", []);
  console.log('done!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
