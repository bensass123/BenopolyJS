
//BenopolyJS (1-17-2017 - a project to practice with)

//this is the board in array form, it will hold boardSquare objects
var board = [];

//the players array, to hold Player objects (this will be added to the inside of the game object)
var players = [];



function BoardSquare(location){
	this.location = location;
}

BoardSquare.prototype.playersPresent = function() {
	//look thru all players, check location, if here, push player into array, return array
	return "AINT NOBODY HERE!";
};

function Property(location, name, price, rentArray, housePrice){
		//establishing inheritance from BoardSquare
	BoardSquare.call(this, location);
		//name of the property
	this.name = name;
		//bank starts off owning everything
	this.isOwned = false;
		//this will change if mortgaged
	this.isOwnedOutright = true;
		//this will change if the property becomes part of a monopoly, this will be used to allow houses to be built and 
		//double the rent if no houses 
	this.isMonpolized = false;
		//the rents with (0 houses, 1 house, 2 house, 3 house, 4 house, hotel)
	this.rentArray = rentArray;
		//cost to purchase property
	this.price = price;
		//price to add houses and hotel
	this.housePrice = housePrice;
}



	//to inherit methods defined in BoardSquare

	// We are using create to create a new prototype property 
	// value (which is itself an object that contains properties and methods) with a prototype 
	// equal to BoardSquare.prototype, and set that to be the value of Property.prototype. This 
	// means that Property.prototype will now inherit all the methods available on 
	// BoardSquare.prototype.
Property.prototype = Object.create(BoardSquare.prototype);

	//setting constructor of Property to Property (must do this with JS inheritance)
Property.prototype.constructor = Property;



//NonProperty Object

function NonProperty(location, name){
		//establishing inheritance from BoardSquare
	BoardSquare.call(this, location);
	this.name = name;
}

	//set it up same as property

NonProperty.prototype = Object.create(BoardSquare.prototype);
NonProperty.prototype.constructor = NonProperty;




function Player(id, name) {
	this.name = name;
	this.id = id;
	this.cash = 1500;
	this.pos = 0;
	this.props = [];
	this.jRolls = 0;
	this.hasGOJcard = false;
	this.rrsOwned = 0;
	this.utsOwned = 0;
  	this.jailed = false;
}