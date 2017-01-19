// makes case stateements out of array
// result is something like this:
		// case 'Advance to Go (Collect $200)':
		// 		g.players[g.cpi].location = 0;
		// 		g.players[g.cpi].passedGo();
		// 		break;
		// case 'Bank error in your favor: collect $200':
		// 		g.players[g.cpi].cash += 200;
		// 		break;
		// case 'Doctor\'s fees: Pay $50':
		// 		g.players[g.cpi].cash -= 50;



var chestCards  = ['Advance to Go (Collect $200)','Bank error in your favor: collect $200','Doctor\'s fees: Pay $50',
	              'Get Out of Jail Free: this card may be kept until needed, or sold',
	              'Go to Jail: go directly to jail, Do not pass Go, do not collect $200',
	              'It is your birthday: Collect $10 from each player',
	              'Grand Opera Night: collect $50 from every player for opening night seats',
	              'Income Tax refund: collect $20','Life Insurance Matures: collect $100','Pay Hospital Fees of $100',
	              'Pay School Fees of $50','Receive $25 Consultancy Fee',
	              'You are assessed for street repairs: $40 per house, $115 per hotel',
	              'You have won second prize in a beauty contest: collect $10','You inherit $100',
	              'From sale of stock you get $50','Holiday Fund matures: Receive $100'];

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

var squareIDs = ['Go', 'BrP1', 'Community Chest', 'BrP2', 'Income Tax 2.0M', 'RR1', 'LbP1', 'Chance', 'LbP2', 'LbP3', 'Just Visiting', 'PP1', 'Utility - Piedmont Natural Gas', 'PP2', 'PP3', 'RR2', 'OP1', 'Community Chest', 'OP2', 'OP3', 'Free Parking', 'RP1', 'Chance', 'RP2', 'RP3', 'RR3', 'YP1', 'YP2', 'Utility - Duke Power', 'YP3', 'Go to jail', 'GP1', 'GP2', 'Community Chest', 'GP3', 'RR4', 'Chance', 'DBP1', 'Luxury Tax 1.0M', 'DBP2'];

var isProperty = [false, true, false, true, false, true, true, false, true, true, false, true, true, true, true, 
	true, true, false, true, true, false, true, false, true, true, true, true, true, true, true, false, true, true, false,
	true, true, false, true, false, true];

target = squareIDs;

var s = "";

for (i in target){
	if (!isProperty[i]){
		s += "		case '" + target[i] + "':" + String.fromCharCode(13) + '			break;' + String.fromCharCode(13);
	}
}

console.log(s);