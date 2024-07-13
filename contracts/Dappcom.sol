// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

error OnlyOwnerAllowed();

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

    struct Order {
        uint256 timestamp;
        Item item;
    }

    event List(string name, uint256 cost, uint256 stock);
    event Buy(address buyer, uint256 orderId, uint256 itemId);

    mapping (uint256 => Item) public items;
    mapping (address => uint256) public orderCount;
    mapping (address => mapping(uint256 => Order)) public orders;

    modifier onlyOwner(){
        if(msg.sender != owner) revert OnlyOwnerAllowed();
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

    function buy(uint256 _id) public payable {
        Item memory item = items[_id];
        require(msg.value >= item.cost, "Send mo' eth");
        require(item.stock > 0, "Item is out of stock");

        Order memory order = Order(block.timestamp, item);
        orderCount[msg.sender] += 1;
        orders[msg.sender][orderCount[msg.sender]] = order; 
        // orders[add] => { 1 : order, 2: order }
        // orders[add2] => { 1: order}

        items[_id].stock = items[_id].stock - 1;

        emit Buy(msg.sender, orderCount[msg.sender], _id);

    }

    function withdraw() public onlyOwner(){
        (bool success, ) = owner.call{ value: address(this).balance }("");
        require(success);
    }
}