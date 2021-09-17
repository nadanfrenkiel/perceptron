
import {Grid} from "./grid.js";
import { Neuron } from "./neuron.js";

console.log("percy.js loaded");

var GRID_SIZE = 7;
var IQ = 5;
var grid = new Grid(GRID_SIZE, GRID_SIZE);
var brain = [];

function initPage() {
	console.log("initializing page");

	createGrid();
	earlyDevelopment();
	$(".tru").click(onTrue);
	$(".false").click(onFalse);

	// displayBinary([1, 0, 1, 1, 0 ]);

	console.log(`page initialized with ${brain.length} neurons`);

}

function earlyDevelopment () {
	for (var i = 0; i < IQ; ++i) {
		brain.push(new Neuron(grid))
	}
}

function createGrid() {
	var $grid = $(".draw-grid");

	for (var row = 0; row < GRID_SIZE; ++row) {
		var $row = createRow(row);
		for (var col = 0; col < GRID_SIZE; ++col) {
			addCellToRow($row, row, col);
		}
		$grid.append($row);
	}
	$(document).on("click", ".grid-cell", function(event) {
		var cell = $(event.currentTarget);
		let col = Number(cell.attr("data-col-number")), 
			row = Number(cell.attr("data-row-number"));

		var current = grid.getCell(col, row);
		grid.setCell(col, row, !current);
		updateCell(col, row);
	});
}

function displayBinary (array) {
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
	var data = grid.getCell(col, row);
	var cell = $(`div.grid-cell[data-row-number="${row}"][data-col-number="${col}"]`);
	cell.toggleClass("on", data);

}

function updateGrid() {

}


$(initPage);
