// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract ProductMarket {
    uint256 public a;
    uint256 public id;
    string public name;
    uint256 public price;
    uint256 public quantity;
    string public owner;

    function setter(uint256 _a, uint256 _id, string memory _name, uint256 _price, uint256 _quantity, string memory _owner) public {
        a = _a;
        id = _id;
        name = _name;
        price = _price;
        quantity = _quantity;
        owner = _owner;
    }

    function getter() public view returns (uint256, uint256, string memory, uint256, uint256, string memory) {
        return (a, id, name, price, quantity, owner);
    }
}