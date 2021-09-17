export class Neuron { 
	constructor (grid) {
		this.grid = grid;
		this.value = 0;
		this.createConnections (grid);
	}
	think () {
		console.log ("I AM THINKING");
	}
	amphitheatre (col, row) {
		console.log(`amplifying connection to ${col}/${row}`);
	}
	lowerTheWheight (col, row) {
		console.log(`attenuating connection to ${col}/${row}`);
	}

	roundOrThin() {
		return this.value;
	}

	createConnections(grid) {
		this.friendGroup = [];
		for (var col = 0; col < grid.cols; col++) {
			for (var row = 0; row < grid.rows; row++) {
				this.friendGroup.push (new Connection(col, row));
			}
		}
		console.log(`The neuron now has ${this.friendGroup.length} connections`);
	}
}

class Connection {
	constructor(col, row) {
		this.col = col;
		this.row = row;
		this.weight = Math.random();
	}
}
