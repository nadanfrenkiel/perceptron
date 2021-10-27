export class Neuron { 
	constructor (grid) {
		this.grid = grid; 
		this.value = 0;
		this.friendGroup = [];
		this.createConnections (grid);
		this.threashold = this.friendGroup.length / 2;
	}

	think () {
		var currentNeuron = 0;
		//this.value = Math.random() < 0.5 ? 0 : 1;
		for (let index = 0; index < this.friendGroup.length; index++) {
			const element = this.friendGroup[index];
			currentNeuron += element.weight * this.grid.getCell (element.col, element.row);		
		}
		if (currentNeuron < this.threashold) {
			this.value = 0;
		}
		else {
			this.value = 1;
		}
		console.log ("I AM THINKING");
	}
	amphitheatre (col, row) {
		var place = row * this.grid.cols + col;
//		this.friendGroup [place].weight = Math.min(1,
			 this.friendGroup [place].weight += 0.05
//		this.friendGroup [place].weight += 0.05
		console.log(`amplifying connection to ${col}/${row} and ${this.friendGroup [place].weight} is the new weight!!!!`);
	}
	lowerTheWheight (col, row) {
		var place = row * this.grid.cols + col;
		this.friendGroup [place].weight = Math.max(0, this.friendGroup [place].weight -= 0.05)
//		this.friendGroup [place].weight -= 0.05
		console.log(`attenuating connection to ${col}/${row} and ${this.friendGroup [place].weight} is the new weight!!!!`);
	}

	roundOrThin() {
		return this.value;
	}

	createConnections(grid) {
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
