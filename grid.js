export class Grid {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;
		this.cells = new Array(cols * rows);
		this.cells.fill(0); 
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

	load(data) {
		this.cells.fill(0); 
		if (Array.isArray(data)) {
			data.forEach(rec => {
				this.setCell(rec.col, rec.row, rec.value);
			})
		}
	}

	save() {
		const ret = [];
		this.forAllCells((value, col, row) => {
			ret.push({ value, col, row });
		})
		return ret;
	}
}

