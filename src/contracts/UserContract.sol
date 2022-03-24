pragma solidity >=0.4.0 <0.6.0;

contract UserContract {
    struct UserDetail {
        address addr;
        string name;
    }

    mapping(address => UserDetail) public user;

    // ADD NAME 
    function updateName(
        address _address,
        string memory _name

    ) public  {
        require(user[_address].addr == msg.sender);
        user[_address].name = _name;    
    }

    // REGISTER 
    function register(
        address _address
       
    ) public  {
        require(user[_address].addr != msg.sender);
        user[_address].addr = _address;

    }

}
