/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.10',
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: false,
        interval: 5000
      },
      accounts: {
        count: 11,
      },
    },
  },
};
