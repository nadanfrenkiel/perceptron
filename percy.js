

console.log("percy.js loaded");

var GRID_SIZE = 7;


function initPage() {
	console.log("initializing page");

	createGrid();

	$(".tru").click(onTrue);
	$(".false").click(onFalse);

	getBI([1, 1, 0, 1 ]);

	console.log("page initialized");

}


function createGrid() {
	var $grid = $(".draw-grid");

	for (var row = 0; row < GRID_SIZE; ++row) {
		var $row = createRow(row);
		for (col = 0; col < GRID_SIZE; ++col) {
			addCellToRow($row, row, col);
		}
		$grid.append($row);
	}
	$(document).on("click", ".grid-cell", function(event) {
		var cell = $(event.currentTarget);
		let col = Number(cell.attr("data-col-number")), 
			row = Number(cell.attr("data-row-number"));

		var current = Grid.getCell(col, row);
		Grid.setCell(col, row, !current);
		updateCell(col, row);
	});
}

function getBI (array) {

	var binaryStr = array.join('');
	$(".banini").text(binaryStr);
	var letter = "a".charCodeAt(0) + parseInt(binaryStr, 2);
	$(".spanini").text(String.fromCharCode(letter));
}

function onTrue () {
	console.log("True pressed");
}

function onFalse () {
	console.log("False pressed");
}

function createRow(rowNumber) {
	return $('<div class="grid-row"' + ' data-row-number="' + rowNumber + '"></div>');
}

function addCellToRow($row, row, col) {
	$row.append($(`<div class="grid-cell" data-row-number="${row}" data-col-number="${col}"></div>`));
}

function updateCell(col, row) {
	var data = Grid.getCell(col, row);
	var cell = $(`div.grid-cell[data-row-number="${row}"][data-col-number="${col}"]`);
	cell.toggleClass("on", data);

}

function updateGrid() {

}


var Grid = {
	rows: GRID_SIZE,
	cols: GRID_SIZE,
	
	cells: new Array(GRID_SIZE * GRID_SIZE),

	getCell: function(col, row) {
		return this.cells[row * this.cols + col];
	},
	
	setCell: function(col, row, data) {
		this.cells[row * this.cols + col] = data;
	},

	forAllCells: function(op) {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				op(this.getCell(col, row), col, row);
			}
		}
	}
}


$(initPage);