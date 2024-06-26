pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract SmartBank {
    address private owner;
    mapping (address => uint256) public tokenBalances;
    mapping (address => uint256) public etherBalances;

    constructor() public {
        owner = msg.sender;
    }

    function createToken(string memory _name, string memory _symbol, uint256 _totalSupply) public {
        // Create a new ERC20 token with the specified name, symbol, and total supply
        ERC20 token = new ERC20(_name, _symbol, _totalSupply);
        tokenBalances[msg.sender] = _totalSupply;
    }

    function getTokenInfo(address _tokenAddress) public view returns (string memory, string memory, uint256) {
        // Return token information (name, symbol, total supply)
        ERC20 token = ERC20(_tokenAddress);
        return (token.name(), token.symbol(), token.totalSupply());
    }

    function getUserTokenBalance(address _userAddress, address _tokenAddress) public view returns (uint256) {
        // Return user's token balance
        return tokenBalances[_userAddress];
    }

    function swapTokenForEther(address _tokenAddress, uint256 _amount) public {
        // Simulate token swap for dummy Ether
        tokenBalances[msg.sender] -= _amount;
        etherBalances[msg.sender] += _amount;
    }
}