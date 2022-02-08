/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.7.3',
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 5000
      },
      accounts: {
        count: 10,
      },
    },
  },
};
