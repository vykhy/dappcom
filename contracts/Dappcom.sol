// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Dappcom {
    string public name = "Dappcom";
    address public immutable owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    event List(string name, uint256 cost, uint256 stock);

    mapping (uint256 => Item) public items;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    function list (
        uint256 _id, string memory _name, string memory _category, string memory _image,
        uint256 _cost, uint256 _rating, uint256 _stock) 
     public onlyOwner {
        Item memory item = Item(
            _id, _name, _category, _image, _cost, _rating, _stock
        );
        items[_id] = item;

        emit List(_name, _cost, _stock);
    }
}