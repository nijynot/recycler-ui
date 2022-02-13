const { network } = require('hardhat');

async function main() {
  await network.provider.send("evm_setAutomine", [true]);

  console.log('Automining activated.');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
