
import { Grid } from "./grid.js";
import { Neuron } from "./neuron.js";

var GRID_SIZE = 5;
var IQ = 5;
var grid = new Grid(GRID_SIZE, GRID_SIZE);
var brain = [];

function initPage() {
	console.log("initializing page");

	createGrid();
	earlyDevelopment();
	$(".calc").click(onCalc);
	$(".tru").click(onTrue);
	$(".false").click(onFalse);
	// displayBinary([1, 0, 1, 1, 0 ]);

	console.log(`page initialized with ${brain.length} neurons`);

}

function earlyDevelopment() {
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
	$(document).on("click", ".grid-cell", function (event) {
		var cell = $(event.currentTarget);
		let col = Number(cell.attr("data-col-number")),
			row = Number(cell.attr("data-row-number"));

		var current = grid.getCell(col, row);
		grid.setCell(col, row, current? 0 : 1);
		updateCell(col, row);
	});
}

function displayBinary(array) {
	var binaryStr = array.join('');
	$(".banini").text(binaryStr);
	var letter = "a".charCodeAt(0) + parseInt(binaryStr, 2);
	$(".spanini").text(String.fromCharCode(letter));
}

function onCalc() {
	var value = [];
	for (let EA = 0; EA < brain.length; EA++) {
		const neuron = brain[EA];
		neuron.think();
		value.push(neuron.value);
	}
	displayBinary(value);

	console.log("Doin magic");
}

function onTrue() {
	console.log("True pressed");
}

function onFalse() {
	//for loop on the brain array
	//if i hath been clicked i shall reward the 1s and do nothing with the 0s and also the 1s in the bits that were off will be punished
	// For each neuron: take its. value feild and put (in an internal array) every neuron that had a value of 1
	// See if its on, if so give less weight to the connections that were on
	// if it`s off do not nothing.GOVE EM MORE WEIGHT
	for (let index = 0; index < brain.length; index++) {
		const neuron = brain[index];
		const currentNeuron = neuron.value
		for (let a = 0; a < grid.rows; a++) {
			for (let b = 0; b < grid.cols; b++) {
				var connection = grid.getCell(b, a);
				if (currentNeuron === 1) {
					if (connection === 1) {
						neuron.lowerTheWheight(b,a);
					}
				}
				else if (currentNeuron === 0) {
					if (connection === 1) {
						neuron.amphitheatre(b,a);
					}
				}
			}
		}
	}
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
console.log("percy.js loaded");
