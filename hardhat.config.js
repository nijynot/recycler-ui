/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');

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
