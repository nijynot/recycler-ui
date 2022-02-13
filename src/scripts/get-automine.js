const { network } = require('hardhat');

async function main() {
  const value = await network.provider.send('hardhat_getAutomine');
  console.log(value);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
