

console.log("percy.js loaded");

var GRID_SIZE = 7;


function initPage() {
	console.log("initializing page");

	createGrid();


	console.log("page initialized");

}


function createGrid() {
	var $grid = $(".draw-grid");

	for (row = 0; row < GRID_SIZE; ++row) {
		var $row = createRow(row);
		for (col = 0; col < GRID_SIZE; ++col) {
			addCellToRow($row, row, col);
		}
		$grid.append($row);
	}
}

function createRow(rowNumber) {
	return $('<div class="grid-row"' + ' data-row-number="' + rowNumber + '"></div>');
}

function addCellToRow($row, row, col) {
	$row.append($(`<div class="grid-cell" data-row-number-"${row}" data-col-number="${col}"></div>`));
}

$(initPage);