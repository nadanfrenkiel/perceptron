export class Grid {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;
		this.cells = new Array(cols * rows);
	}
	

	getCell(col, row) {
		return this.cells[row * this.cols + col];
	}
	
	setCell(col, row, data) {
		this.cells[row * this.cols + col] = data;
	}

	forAllCells(op) {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				op(this.getCell(col, row), col, row);
			}
		}
	}
}

