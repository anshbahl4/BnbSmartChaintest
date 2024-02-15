// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTBulkTransfer {
    function bulkTransferNFT(
        address nftAddress,
        uint256 startingRange,
        uint256 endingRange,
        address receiver
    ) external {
        // Check if ending range is greater than starting range
        require(endingRange > startingRange, "Invalid range");

        for (uint256 tokenId = startingRange; tokenId <= endingRange; tokenId++) {
            // Skip if the sender doesn't own the NFT
            if (IERC721(nftAddress).ownerOf(tokenId) != msg.sender) {
                continue;
            }

            // Transfer the NFT to the receiver
            IERC721(nftAddress).transferFrom(msg.sender, receiver, tokenId);
        }
    }
}
