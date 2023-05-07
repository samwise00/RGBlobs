pragma solidity 0.8.8;

//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RGBlobs is ERC1155 {
    uint256 public constant RED = 0;
    uint256 public constant GREEN = 1;
    uint256 public constant BLUE = 2;
    uint256 public constant YELLOW = 3;
    uint256 public constant MAGENTA = 4;
    uint256 public constant CYAN = 5;
    uint256 public constant WHITE = 6;

    address public operator;

    string public name = "RGBlobs";

    constructor() ERC1155("https://ipfs.io/ipfs/QmWgscLTQag1Q93VkEbpLg3EH8EtfJ9Q5cuSKC4RkDNiFJ/0.json") {}

    function setOperator(address _operator) public {
        operator = _operator;
    }

    function mintToken(address to, uint256 id) public {
        require(msg.sender == operator, "Only operator can mint.");
         _mint(to, id, 1, "");
    }

    function burnTokens(address to, uint256 id, uint256 amount) public {
        require(msg.sender == operator, "Only operator can call this function.");
        _burn(to, id, amount);
    }

    function uri(uint256 _tokenId) override public pure returns (string memory) { 
        return string(abi.encodePacked("https://ipfs.io/ipfs/QmWgscLTQag1Q93VkEbpLg3EH8EtfJ9Q5cuSKC4RkDNiFJ/", Strings.toString(_tokenId), ".json")); 
    }
}

contract RGBlobsForger {
    RGBlobs public MyNFTContract;

    constructor(address _MyNFTsAddress) {
        MyNFTContract = RGBlobs(_MyNFTsAddress);
    }

    // user => (tokenId => lastMintedAt)
    mapping (address => mapping(uint256 => uint256)) public lastMintedAt; // store address's mint timestamp for tokens they've minted
    
    function mint(uint256 id) public {
        require(id == 0 || id == 1 || id == 2, "Invalid token ID");
        // check to see if current timestamp is less than a minute from the timestamp of the user's last mint for that tokenid
        if (lastMintedAt[msg.sender][id] > 0) { // ensure there is a lastMintedAt entry for that user && tokenid
            require(block.timestamp >= lastMintedAt[msg.sender][id] + 1 minutes, "mint is still on cooldown");
        }
        
        // mint
        MyNFTContract.mintToken(msg.sender, id);
        lastMintedAt[msg.sender][id] = block.timestamp; // update lastMintedAt mapping
    }

    function forge(uint256 id) public {
        // Burn a Red (0) and Green (1) to mint a Yellow (3)
        if (id == 3) {
            require(
                MyNFTContract.balanceOf(msg.sender, 0) > 0 && MyNFTContract.balanceOf(msg.sender, 1) > 0,
                "Caller must own Red and Green NFTs to mint Yellow NFT"
            );

            MyNFTContract.burnTokens(msg.sender, 0, 1); // Burn Red
            MyNFTContract.burnTokens(msg.sender, 1, 1); // Burn Green
            MyNFTContract.mintToken(msg.sender, id);
            
        }

        // Burn a Blue (2) and Red (0) to mint a Magenta (4)
        if (id == 4) {
            require(
                MyNFTContract.balanceOf(msg.sender, 2) > 0 && MyNFTContract.balanceOf(msg.sender, 0) > 0,
                "Caller must own Blue and Red NFTs to mint Magenta NFT"
            );

            MyNFTContract.burnTokens(msg.sender, 2, 1); // Burn Blue
            MyNFTContract.burnTokens(msg.sender, 0, 1); // Burn Red
            MyNFTContract.mintToken(msg.sender, id); // Mint Magenta
        }

        // Burn a Green (1) and Blue (2) to mint a Cyan (5)
        if (id == 5) {
            require(
                MyNFTContract.balanceOf(msg.sender, 1) > 0 && MyNFTContract.balanceOf(msg.sender, 2) > 0,
                "Caller must own Green and Blue NFTs to mint Cyan NFT"
            );

            MyNFTContract.burnTokens(msg.sender, 1, 1); // Burn Green
            MyNFTContract.burnTokens(msg.sender, 2, 1); // Burn Blue
            MyNFTContract.mintToken(msg.sender, id); // Mint Cyan
        }

        if (id == 6) {
            require(
                MyNFTContract.balanceOf(msg.sender, 0) >= 1 && MyNFTContract.balanceOf(msg.sender, 1) >= 1 && MyNFTContract.balanceOf(msg.sender, 2) >= 1,
                "Caller does not own enough Red, Green, or Blue NFTs to mint White NFT"
            );

            MyNFTContract.burnTokens(msg.sender, 0, 1); // Burn Red
            MyNFTContract.burnTokens(msg.sender, 1, 1); // Burn Green
            MyNFTContract.burnTokens(msg.sender, 2, 1); // Burn Blue

            MyNFTContract.mintToken(msg.sender, id);
        }
    }

    function burn(uint256 id, uint256 amount) public {
        require(MyNFTContract.balanceOf(msg.sender, id) != 0, "must own tokens");
        MyNFTContract.burnTokens(msg.sender, id, amount);
    }

    function swap(uint256 tradeFromId, uint256 tradeToId) public {
        require(tradeToId == 0 || tradeToId == 1 || tradeToId == 2, "invalid swap"); // can only trade to base colors
        require(tradeFromId != tradeToId, "cannot trade from same color");

        MyNFTContract.burnTokens(msg.sender, tradeFromId, 1); 
        MyNFTContract.mintToken(msg.sender, tradeToId);
    }

    function cooldownTimer(uint256 id) public view returns(uint256) {
        require(id == 0 || id == 1 || id == 2, "Invalid token ID");
        return block.timestamp - lastMintedAt[msg.sender][id];
    }
}
