// migrations/2_deploy_contracts.js
const NFTBulkTransfer = artifacts.require("NFTBulkTransfer");

module.exports = function(deployer) {
  deployer.deploy(NFTBulkTransfer);
};
