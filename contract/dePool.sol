// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract dePool {
    struct human {
        string name;
        uint256 age;
        bool gender;    // 0 for female, 1 for male
    }

    struct ride {
        uint256 rideId;
        string origin;
        string destination;
        uint256 departuretime;
        uint256 fare;
        uint256 seats;
    }

    mapping (uint256 => address) public rideowner;
    mapping (uint256 => mapping(uint256 => address)) public rideToRider;
    uint256 public ridecount = 0;
    ride[] public rides;
    human[] public person;
    mapping (address => human) public addressDetails;
    // ride[] public searchRides;

    event rideCreated(
        uint256 rideId,
        string origin,
        string destination,
        uint256 departuretime,
        uint256 fare,
        uint256 seats        
    );

    event rideBooked(
        uint256 rideId,
        uint256 seats,
        address passenger
    );

    function addUser(string memory _name, uint256 _age, bool _gender) public {
        addressDetails[msg.sender].name = _name;
        addressDetails[msg.sender].gender = _gender;
        addressDetails[msg.sender].age = _age;
        person.push(human(_name, _age, _gender));
    }


    function createride(string memory _origin, string memory _destination, uint256 _departuretime, uint256 _fare, uint256 _seats) public {
        rides.push(ride(ridecount, _origin, _destination, _departuretime, _fare, _seats));
        rideowner[ridecount] = msg.sender;
        emit rideCreated(ridecount, _origin, _destination, _departuretime, _fare, _seats);
        ridecount++;
    }  

    function bookRide(uint256 rideId) public {
        rideToRider[rideId][rides[rideId].seats] = msg.sender;
        rides[rideId].seats -= 1;
        emit rideBooked(rideId, rides[rideId].seats, msg.sender);
    }

}