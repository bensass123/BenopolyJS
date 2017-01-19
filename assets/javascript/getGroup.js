
var groups = [];
var propIDs = ['Go', 'BrP1', 'Community Chest', 'BrP2', 'Income Tax 2.0M', 'RR1', 'LbP1', 'Chance', 'LbP2', 'LbP3', 'Just Visiting', 'PP1', 'Utility - Piedmont Natural Gas', 'PP2', 'PP3', 'RR2', 'OP1', 'Community Chest', 'OP2', 'OP3', 'Free Parking', 'RP1', 'Chance', 'RP2', 'RP3', 'RR3', 'YP1', 'YP2', 'Utility - Duke Power', 'YP3', 'Go to jail', 'GP1', 'GP2', 'Community Chest', 'GP3', 'RR4', 'Chance', 'DBP1', 'Luxury Tax 1.0M', 'DBP2'];
var isProperty = [false, true, false, true, false, true, true, false, true, true, false, true, true, true, true, 
	true, true, false, true, true, false, true, false, true, true, true, true, true, true, true, false, true, true, false,
	true, true, false, true, false, true];

for (i in propIDs) {
	var prop = propIDs[i];
	if (isProperty[i]) {
		groups.push(prop.slice(0,2));
	}
	else {
		groups.push('na');
	}
}