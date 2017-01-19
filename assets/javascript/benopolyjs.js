
//BenopolyJS (1-17-2017 - a project to practice with)

//game variable
var g;


	//shuffles an array
function shuffleCards(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}


function BoardSquare(location){
	this.location = location;
}

BoardSquare.prototype.playersPresent = function() {
	//look thru all players, check location, if here, push player into array, return array
	return "AINT NOBODY HERE!";
};

function Property(location, name, price, rentArray, housePrice, group){
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
		//setting rent as double if monopolized
	this.monoRent = (this.rentArray[0] * 2);
		//set property group
	this.group = group;
	this.ownedByPlayerIndex = -1;
}



	// to inherit methods defined in BoardSquare
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

function Card(id, name) {
	this.id = id;
	this.name = name;
}

Card.prototype.doCard = function () {
	alert(this.name);
	console.log('doCard started using: ' + this.name);
	switch(this.name){
			//case statements for all cards
		case 'Advance to Go (Collect $200)':
			g.players[g.cpi].location = 0;
			g.players[g.cpi].passedGo();
			break;
		case 'Bank error in your favor: collect $200':
			g.players[g.cpi].cash += 200;
			break;
		case 'Doctor\'s fees: Pay $50':
			g.players[g.cpi].cash -= 50;
			break;
		case 'Get Out of Jail Free: this card may be kept until needed, or sold':
			g.players[g.cpi].hasGOJcard = true;
			break;
		case 'Go to Jail: go directly to jail, Do not pass Go, do not collect $200':
			g.players[g.cpi].sendToJail();
			break;
		case 'It is your birthday: Collect $10 from each player':
			g.players[g.cpi].collectFromAllOthers(10);
			break;
		case 'Grand Opera Night: collect $50 from every player for opening night seats':
			g.players[g.cpi].collectFromAllOthers(50);
			break;
		case 'Income Tax refund: collect $20':
			g.players[g.cpi].cash += 20;
			break;
		case 'Life Insurance Matures: collect $100':
			g.players[g.cpi].cash += 100;
			break;
		case 'Pay Hospital Fees of $100':
			g.players[g.cpi].cash -= 100;
			break;
		case 'Pay School Fees of $50':
			g.players[g.cpi].cash -= 50;
			break;
		case 'Receive $25 Consultancy Fee':
			g.players[g.cpi].cash += 25;
			break;
		case 'You are assessed for street repairs: $40 per house, $115 per hotel':
			g.players[g.cpi].makeRepairs(40, 115);
			break;
		case 'You have won second prize in a beauty contest: collect $10':
			g.players[g.cpi].cash += 10;
			break;
		case 'You inherit $100':
			g.players[g.cpi].cash += 100;
			break;
		case 'From sale of stock you get $50':
			g.players[g.cpi].cash += 50;
			break;
		case 'Holiday Fund matures: Receive $100':
			g.players[g.cpi].cash += 100;
			break;
		case 'Advance to Illinois Ave:  if you pass Go, collect $200':
			console.log('illinois');
			g.players[g.cpi].goToSquare(24);
			break;
		case 'Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.':
			console.log('utility');
			//create flag to skip rent payment and do custom roll and rent payment in its own method
			//todo
			break;
		case 'Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.':
			console.log('RR');
			//create flag to skip rent payment and do custom roll and rent payment in its own method
			//todo
			break;
		case 'Advance to St. Charles Place: if you pass Go, collect $200':
			console.log('st charles');
			g.players[g.cpi].goToSquare(11);
			break;
		case 'Bank pays you dividend of $50':
			g.players[g.cpi].cash += 50;
			break;
		case 'Get out of Jail Free:  this card may be kept until needed, or traded/sold':
			g.players[g.cpi].hasGOJcard = true;
			break;
		case 'Go back 3 spaces':
			console.log('back 3');
			g.players[g.cpi].moveBack3();
			break;
		case 'Go directly to Jail:  do not pass Go, do not collect $200':
			console.log('jail');
			g.players[g.cpi].sendToJail();
			break;
		case 'Make general repairs on all your property: for each house pay $25, for each hotel $100':
			//to-do
			g.players[g.cpi].makeRepairs(25, 100);
			console.log('repairs');
			break;
		case 'Pay poor tax of $15':
			g.players[g.cpi].cash -= 15;
			break;
		case 'Take a trip to Reading Railroad:  if you pass Go, collect $200':
			g.players[g.cpi].goToSquare(5);
			console.log('reading');
			break;
		case 'Take a walk on the Boardwalk:  advance token to Boardwalk':
			g.players[g.cpi].goToSquare(39);
			break;
		case 'You have been elected chairman of the board:  pay each player $50':
			g.players[g.cpi].payAllOthers(50);
			break;
		case 'Your building loan matures:  collect $150':
			g.players[g.cpi].cash += 150;
			break;
		case 'You have won a crossword competition: collect $100':
			g.players[g.cpi].cash += 100;
			break;
	//end of Card case statements
	}
	if (g.board[g.players[g.cpi].location].constructor === Property){
		g.players[g.cpi].prompt();
	}
	g.players[g.cpi].promptDone();
	updateView();

}

Player.prototype.payAllOthers = function (pmt){
			for (i in g.players) {
				if (g.cpi != i){
					g.players[i].cash += pmt;
					g.players[g.cpi].cash -= pmt;
				}
			}
}

Player.prototype.collectFromAllOthers = function (pmt){
			for (i in g.players) {
				if (g.cpi != i){
					g.players[i].cash -= pmt;
					g.players[g.cpi].cash += pmt;
				}
			}
}

Player.prototype.makeRepairs = function (houseCost, hotelCost){
	var repairCost = 0;
	var housesTotal = 0;
	var hotelsTotal = 0;
	repairableProps = this.props;
		for (i in repairableProps){
			if (repairableProps[i].houses < 5){
				housesTotal += repairableProps[i].houses;
			}
			else {
				hotelsTotal += 1;
			}
		}
		repairCost = (housesTotal * houseCost) + (hotelsTotal * hotelCost);
		this.cash -= repairCost;
		console.log('Player id ' + this.id + ' had ' + housesTotal + ' houses and ' + hotelsTotal + 
			' hotels. Their total repair bill was ' + repairCost);
}

function Player(id, name) {
	this.name = name;
	this.id = id;
	this.cash = 1500;
	this.location = 0;
	this.props = [];
	this.jRolls = 0;
	this.hasGOJcard = false;
	this.rrsOwned = 0;
	this.utsOwned = 0;
  	this.jailed = false;
  	this.doubleRolls = 0;
}

Player.prototype.moveBack3 = function () {
	if (this.location > 2) {
		this.location -= 3;
	}
	else {
		var temp;
		temp = this.location -= 3;
		this.location = temp + 40;
	}
}

Player.prototype.sendToJail = function () {
	this.location = 10;
	this.jailed = true;
	this.jrolls = 0;
	$('#rollButton').addClass('disabled');
}



Player.prototype.rollDice = function () {
	//rolling dice
  var dice1 = Math.floor((Math.random() * 6) + 1);
  var dice2 = Math.floor((Math.random() * 6) + 1);
  total = dice1 + dice2;
  //debug test
  total = 7;
  $('#dice').html('');
  $('#dice').html('Player with id: ' + this.id + ' rolled ' + dice1 + " & " + dice2);

  	//jail handler - do this if player not in jail
  	if(!(this.jailed)) {
	  console.log('Player with id: ' + this.id + ' rolled ' + dice1 + " & " + dice2);
	  	//incrementing doubles, or resetting to 0
	  if (dice1 === dice2){
	  	this.doubleRolls +=1;
	  	//letting out of jail if rolled doubles
	  	if (this.jailed) {
	  		this.jailed = false;
	  		this.doubleRolls = 0;
	  	}
	  }
	  else {
	  	this.doubleRolls = 0;
	  	$('#rollButton').addClass('disabled');
	  }
	  	
	  	//if you havent rolled doubles three times in a row, then move your guy
	  if (this.doubleRolls < 3){
	  	if ((this.location + total) < 40) {
	  		this.location += total;
	  	}
	  	else {
	  			//award player 200
	  		this.passedGo();
	  			//set location when passing go
	  		var goLoc = this.location + total - 40;
	  		this.location = goLoc;
	  	}
	  }
	  	//if you have rolled doubles 3 times in a row, set location to jail, change jailed to true, set jRolls to 0
	  	//hide roll button and run promptdone()
	  else {
	  	this.sendToJail();
	  	this.promptDone();
	  }

		updateView();
		this.prompt();
		this.promptDone();
	}
		//do this if player in jail
	else {
		if (dice1 === dice2) {
			alert('Doubles! You are free Player with id ' + this.id);
			this.jailed = false;
			this.location += total;
			this.jRolls = 0;
			updateView();
			$('#rollButton').addClass('disabled');
			this.prompt();
			this.promptDone();
		}
		else if (this.jRolls < 2) {
			this.jRolls += 1;
			alert('You rolled ' + dice1 + ' & ' + dice2 + ' You\'re still in jail, you have '  + (3 - this.jRolls) + ' roll(s) to try and roll doubles and avoid $50 fee.');
			$('#rollButton').addClass('disabled');
			this.promptDone();
		}
		else {
			alert('You rolled ' + dice1 + ' & ' + dice2 + '. You did your time player with id ' + this.id + '. But, no doubles so no free pass. You still gotta pay up $50. You are free now.');
			this.cash -= 50;
			this.location += total;
			this.jailed = false;
			this.jRolls = 0;
			$('#rollButton').addClass('disabled');
			updateView();
			this.prompt();
			this.promptDone();
		}
	}

}


Player.prototype.promptDone = function () {
	$('#doneButton').removeClass('disabled');
}

Player.prototype.prompt = function () {
	//check if property
	$('#currentSquare').text(g.board[this.location].name);
	if (g.board[this.location].constructor === Property){
		if (g.board[this.location].ownedByPlayerIndex >= 0) {
			this.payRent();
		}
		else {
			this.buyPrompt();
		}
	}
	//do this if NonProperty
	else {
		//case statements for each nonproperty square
		switch(g.board[this.location].name){
			case 'Go':
				//already handled
				break;
			case 'Community Chest':
				this.pullCard('Chest');
				break;
			case 'Income Tax - $200':
				this.cash -= 200;
				break;
			case 'Chance':
				this.pullCard('Chance');
				break;
			case 'Just Visiting':
				break;
			case 'Free Parking':
				break;
			case 'Go to jail':
				this.sendToJail();

				break;
			case 'Chance':
				break;
			case 'Luxury Tax 1.0M':
				break;
		}
	}
}

Player.prototype.pullCard = function (deck){
	if (deck === 'Chance'){
			//pull card from deck, do action on card, return card to bottom of deck
		var activeCard = g.chanceCards[0];
		console.log('active card\'s name is: ' + activeCard.name);
		g.chanceCards.splice(0, 1);
		console.log('card has been removed from deck. deck size is now: ' + g.chanceCards.length);
		activeCard.doCard();
		console.log('action on card has been performed');
		g.chanceCards.push(activeCard);
		console.log('card has been returned to bottom of deck. deck size is now: ' + g.chanceCards.length);
		console.log('top card in deck is: ' + g.chanceCards[0].name + '. Bottom card in deck is now: ' + g.chanceCards[g.chanceCards.length - 1].name);
	}
	else if (deck === 'Chest'){
			//pull card from deck, do action on card, return card to bottom of deck
		var activeCard = g.chestCards[0];
		g.chestCards.splice(0, 1);
		activeCard.doCard();
		g.chestCards.push(activeCard);
	}
}

Player.prototype.goToSquare = function (squareLocation){
	var initialLoc = this.location;
	this.location = squareLocation;
	if (squareLocation < initialLoc){
		this.passedGo();
	}
}

Player.prototype.buy = function () {
	this.props.push(g.board[this.location]);
	console.log('player ' + this.id + ' just bought ' + g.board[this.location].name + 'he also owns: ');
	for (i in this.props){
		console.log(this.props[i].name);
	}
}


Player.prototype.payRent = function () {
	var ownerIndex = g.board[this.location].ownedByPlayerIndex;
	var tenantIndex = this.id;
	var rent;
	switch(g.board[this.location].houses){
		case 0:
			rent = g.board[this.location].rent0;
			break;
		case 1:
			rent = g.board[this.location].rent1;
			break;
		case 2:
			rent = g.board[this.location].rent2;
			break;
		case 3:
			rent = g.board[this.location].rent3;
			break;
		case 4:
			rent = g.board[this.location].rent4;
			break;
		case 5:
			rent = g.board[this.location].rent5;
			break;
	}
	g.players[tenantIndex].cash -= rent;
	g.players[ownerIndex].cash += rent;
	console.log('rent paid by player id ' + tenantIndex +' to player with id ' + ownerIndex);
}

Player.prototype.buyPrompt = function () {
	//show buy button
	$('#buyButton').removeClass('disabled');
}


Player.prototype.passedGo = function () {
	this.cash += 200;
	console.log('ran passedGo for player id ' + this.id + ', this.name');
}





function createPlayers(){
	var players = [];
	for (i=0; i < 3; i++){
		var p = new Player(i, "Bob_" + i);
		players.push(p);
	}
	return players;
}

function createBoard(){
		//creating array of objects to be the board
	var currentSquare;
	var loc;
	var board = [];
	var rents = [];
	var name;
	var price;
	var housePrice;
	var group;
	var isProperty = [false, true, false, true, false, true, true, false, true, true, false, true, true, true, true, 
	true, true, false, true, true, false, true, false, true, true, true, true, true, true, true, false, true, true, false,
	true, true, false, true, false, true];
	var prices = [0,60,0,60,0,200,100,0,100,120,0,140,150,140,160,200,180,0,180,200,0,220,0,220,240,200,260,260,150,280,0,300,300,0,320,200,350,0,400];
	var rent0 =[0,2,0,4,0,98, 6,0,6,8,0,10,99,10,12,98,14,0,14,16,0,18,0,18,20,98,22,22,99,24,0,26,26,0,28,98,0,35,0,50];
	var rent1 = [0,10,0,20,0,99,30,0,30,40,0,50,98,50,60,99,70,0,70,80,0,90,0,90,100,99,110,110,98,120,0,130,130,0,150,99,0,175,0,200];
	var rent2 = [0,30, 0,60,0,99,90,0,90,100,0,150,98,150,180,99,200,0,200,220,0, 250,0,250, 300,99,330,330,98,360,0,390,390,0,450,99,0,500,0,600];
	var rent3 = [0,90,0,180,0,99,270,0,270,300,0,450,98,450,500,99,550,0,550,600,0,700,0,700,750,99,800,800,98,850,0,900,900,0,1000,99,0,1100,0,1400];
	var rent4 = [0,160,0,320,0,99,400,0,400,450,0,625,98,625,700,99,750,0,750,800,0,875,0,875,925,99,975,975,98,1025,0,1100,1100,0,1200,99,0,1300,0,1700];
	var rent5 = [0,250,0,450,0,99,550,0,550,600,0,750,98,750,900,99,950,0,950,1000,0,1050,0,1050,1100,99,1150,1150,98,1200,0,1275,1275,0,1400,99,0,1500,0,2000];
	var housePrices = [50,50,50,50,50,50,50,50,50,50,100,100,100,100,100, 100,100,100,100,100, 150,150,150,150,150, 150,150,150,150,150, 200,200,200,200,200, 200,200,200,200,200];
	var squareIDs = ['Go', 'BrP1', 'Community Chest', 'BrP2', 'Income Tax - $200', 'RR1', 'LbP1', 'Chance', 'LbP2', 'LbP3', 'Just Visiting', 'PP1', 'Utility - Piedmont Natural Gas', 'PP2', 'PP3', 'RR2', 'OP1', 'Community Chest', 'OP2', 'OP3', 'Free Parking', 'RP1', 'Chance', 'RP2', 'RP3', 'RR3', 'YP1', 'YP2', 'Utility - Duke Power', 'YP3', 'Go to jail', 'GP1', 'GP2', 'Community Chest', 'GP3', 'RR4', 'Chance', 'DBP1', 'Luxury Tax 1.0M', 'DBP2'];
	var groups = ["na", "Br", "na", "Br", "na", "RR", "Lb", "na", "Lb", "Lb", "na", "PP", "Ut", "PP", "PP", "RR", "OP", "na", "OP", "OP", "na", "RP", "na", "RP", "RP", "RR", "YP", "YP", "Ut", "YP", "na", "GP", "GP", "na", "GP", "RR", "na", "DB", "na", "DB"];

	for (i in isProperty){
		if (isProperty[i]) {
				//creating rent array
			rents = [];
			rents.push(rent0[i], rent1[i], rent2[i], rent3[i], rent4[i], rent5[i]);
				//property name
			name = squareIDs[i];
				//property price
			price = prices[i];
				//house price
			housePrice = housePrices[i];
				//setting board location to incrementer
			loc = i;
				//set property group
			group = groups[i].toUpperCase();
				//creating property object
			currentSquare = new Property(loc, name, price, rents, housePrice, group);
				//adding to board
			board.push(currentSquare);
		}
		else {
			name = squareIDs[i];
			loc = i;
				//creating non property square and pushing to board
			currentSquare = new NonProperty(loc, name);
			board.push(currentSquare);
		}

	}

	return board;
}

function Game(players, board) {
	this.players = players;
	this.gameGoing = true;
	this.playersLeft = players.length;
	this.totalRolls = 0;
		//this is the board in array form, it will hold boardSquare objects
	this.board = board;
	this.cpi = 0;
	this.chestCards = [];
	this.createChestCards();
	this.chanceCards = [];
	this.createChanceCards();
}		

Game.prototype.nextPlayer = function () {
		this.cpi += 1;
		if (this.cpi === this.players.length) {
			this.cpi = 0;
		}
			//re-enable roll dice button for next player
		$('#rollButton').removeClass('disabled');
		console.log('next player run');
}

Game.prototype.createChestCards = function () {
	var c;
	var retArray = [];
	var chestCards = ['Advance to Go (Collect $200)','Bank error in your favor: collect $200','Doctor\'s fees: Pay $50',
	              'Get Out of Jail Free: this card may be kept until needed, or sold',
	              'Go to Jail: go directly to jail, Do not pass Go, do not collect $200',
	              'It is your birthday: Collect $10 from each player',
	              'Grand Opera Night: collect $50 from every player for opening night seats',
	              'Income Tax refund: collect $20','Life Insurance Matures: collect $100','Pay Hospital Fees of $100',
	              'Pay School Fees of $50','Receive $25 Consultancy Fee',
	              'You are assessed for street repairs: $40 per house, $115 per hotel',
	              'You have won second prize in a beauty contest: collect $10','You inherit $100',
	              'From sale of stock you get $50','Holiday Fund matures: Receive $100'];
	
	for (i in chestCards){
		c = new Card(i,chestCards[i]);
		retArray.push(c);
	}
	this.chestCards = shuffleCards(retArray);
}

Game.prototype.createChanceCards = function () {
	var c;
	var retArray = [];
	var chanceCards = ['Advance to Go (Collect $200)','Advance to Illinois Ave:  if you pass Go, collect $200',
               'Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.',
               'Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.',
               'Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.',
               'Advance to St. Charles Place: if you pass Go, collect $200','Bank pays you dividend of $50',
               'Get out of Jail Free:  this card may be kept until needed, or traded/sold','Go back 3 spaces',
               'Go directly to Jail:  do not pass Go, do not collect $200',
               'Make general repairs on all your property: for each house pay $25, for each hotel $100',
               'Pay poor tax of $15','Take a trip to Reading Railroad:  if you pass Go, collect $200',
               'Take a walk on the Boardwalk:  advance token to Boardwalk',
               'You have been elected chairman of the board:  pay each player $50',
               'Your building loan matures:  collect $150','You have won a crossword competition: collect $100'];
               g
	for (i in chanceCards){
		c = new Card(i, chanceCards[i]);
		retArray.push(c);
	}
	this.chanceCards = shuffleCards(retArray);
}



function debug(){

	g = new Game(createPlayers(), createBoard());
	updateView();
	createButtons();

}

function createButtons(){
	var b1 = $('<input/>').attr({
                type: "button",
                id: "rollButton",
                value: 'Roll Dice',
                class: 'actionButton btn-primary'
            }).on("click", function() {
            	g.players[g.cpi].rollDice();
            });
    $('#buttons').append(b1);

	var b2 = $('<input/>').attr({
                type: "button",
                id: "buyButton",
                value: 'Buy Property',
                class: 'actionButton btn-lg disabled'
            }).on("click", function() {
            	g.players[g.cpi].buy();
            	$('#buyButton').addClass('disabled');
            });

	var b3 = $('<input/>').attr({
                type: "button",
                id: "doneButton",
                value: 'Done With Turn',
                class: 'actionButton btn-lg disabled'
            }).on("click", function() {
            	g.nextPlayer();
            	console.log('next player button clicked');
            	$('#doneButton').addClass('disabled');
            	updateView();
            });

    $('#buttons').append(b1);
    $('#buttons').append(b2);
    $('#buttons').append(b3);
}

function updateView(){
	console.log('started updateView');
	var panel = $('<div>').attr({'class': 'panel panel-default', 'id': 'playerPanel'});
	var pBody = $('<div>').attr({'class': 'panel-body', 'id': 'playerPanelBody'});
	panel.append(pBody);
	$('#debug').empty();
	$('#debug').append(panel);


	for (i in g.players){
		var propList = '';
		for(p in g.players[i].props) {
			propList += g.players[i].props[p].name;
			propList += ', ';
		}
		propList = propList.slice(0, -2);
		var pDiv = $('<div>').attr({'class': 'playerDetails', 'id': 'player_' + (g.players[i].id + 1)});
			//displaying all player data
		var p1 = $('<p>').html('Name: ' + g.players[i].name+ '<br>' +  'Cash: ' + g.players[i].cash + '<br>' + 'Location: ' 
			+ g.players[i].location + '<br>' + 'Properties: ' + propList + 
			'<br>' + 'id: ' + (g.players[i].id) + '<br>' + 'rrsOwned: ' + g.players[i].rrsOwned + 
			'<br>' + 'utsOwned: ' + g.players[i].utsOwned + '<br>' + 'hasGOJcard: ' + 
			g.players[i].hasGOJcard + '<br>' + 'jRolls: ' + g.players[i].jRolls + '<br>' + 'jailed: ' 
			+ g.players[i].jailed + '<br>' + 'doubleRolls: ' + g.players[i].doubleRolls);
		pDiv.append(p1);
		panel.append(pDiv);
	}
	
}

// function Player(id, name) {
// 	this.name = name;
// 	this.id = id;
// 	this.cash = 1500;
// 	this.location = 0;
// 	this.props = [];
// 	this.jRolls = 0;
// 	this.hasGOJcard = false;
// 	this.rrsOwned = 0;
// 	this.utsOwned = 0;
//   	this.jailed = false;
//   	this.doubleRolls = 0;
// }

debug();




