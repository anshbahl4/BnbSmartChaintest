const NFTBulkTransfer = artifacts.require("NFTBulkTransfer");
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

contract("NFTBulkTransfer", async accounts => {
  let contractInstance;

  before(async () => {
    contractInstance = await NFTBulkTransfer.deployed();
  });

  it("should transfer NFTs in bulk", async () => {
    // Mock ERC721 contract address and receiver address
    const nftAddress = constants.ZERO_ADDRESS;
    const receiver = accounts[1];

    // Call the bulkTransferNFT function
    const startingRange = new BN(1);
    const endingRange = new BN(5);
    const tx = await contractInstance.bulkTransferNFT(nftAddress, startingRange, endingRange, receiver);

    // Assert events emitted from the function
    expectEvent(tx, "Transfer", { from: accounts[0], to: receiver, tokenId: startingRange });
    expectEvent(tx, "Transfer", { from: accounts[0], to: receiver, tokenId: endingRange });
  });

  it("should revert if ending range is less than or equal to starting range", async () => {
    const nftAddress = constants.ZERO_ADDRESS;
    const receiver = accounts[1];
    const startingRange = new BN(5);
    const endingRange = new BN(1);

    await expectRevert(
      contractInstance.bulkTransferNFT(nftAddress, startingRange, endingRange, receiver),
      "Invalid range"
    );
  });
});
