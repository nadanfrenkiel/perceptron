import { Grid } from "./grid.js";
import { Neuron } from "./neuron.js";
import $ from "./jquery.module.js"
import { DataServer } from "./dataServer.js"
//import * as $ from "./jquery.js";

var GRID_SIZE = 7;
var IQ = 5;
var grid = new Grid(GRID_SIZE, GRID_SIZE);
var brain = [];

function initPage() {
	console.log("initializing page");

	createGrid();
	earlyDevelopment();


	createNeuronViewer();
	createDataGrid ();
	// attach click handlers to the various UI buttons
	$(".calc").click(onCalc);
	$(".tru").click(onTrue);
	$(".false").click(onFalse);

	// grp();
	// Initialize the data servers. Each supports saving and loading grid or network states.
	var ds = new DataServer("network", ".load-network-container");
	ds.init();
	$(ds).on("save", onSaveNetwork)
		.on("load", onLoadNetwork);
	ds = new DataServer("grid", ".load-grid-container");
	ds.init();
	$(ds).on("save", onSaveGrid)
		.on("load", onLoadGrid);
	// displayBinary([1, 0, 1, 1, 0 ]);

	console.log(`page initialized with ${brain.length} neurons`);

}
/**
 * Creates the neurons
 */
function earlyDevelopment() {
	for (var i = 0; i < IQ; ++i) {
		brain.push(new Neuron(grid))
	}
}

function createNeuronViewer()  {
	/*
	1. create the neuron chooser, in the neuron-chooser container
	2. Create the neuron viewer grid in the neu-weights container
	*/
	createNeuronChooser(".neuron-chooser");
	createNeuronGrid(".neu-weights");
}

/**
 * Creates a ui that allows selection of a single neuron for display in the neuron visualizer
 * @param {*} selector 
 */
function createNeuronChooser(selector) {
	// <button class="neu-bton">1</button>
	var container = $(selector);
	for (var i = 0; i < brain.length; ++i) {
		var neuron = brain[i];
		var btn = $(`<button class="neu-button" data-neuron-number="${i}">${i}</button>`);
		btn.on("click", onNeuronSelected);
		container.append(btn);
	}
}

function onNeuronSelected(event) {
	var neuronIndex = $(event.currentTarget).attr("data-neuron-number");
	displayNeuron(brain[neuronIndex]);
}

function displayNeuron(neuron) {
	console.log("Displaying weights", neuron.friendGroup);
}

//need the cells to refer to the current neuron or do I only create the grid
function createDataGrid (currentNeuron) {
	var what = $(currentNeuron);
	for (var i = 0; i < grid.length; i++) {
		var btn = $(`<button class="neu-cell">${i}</button>`);
		container.append(btn);
	}

}

//function neuronGridData



/**
 * Creates a grid that visualizes a specific neuron's weights
 * @param {*} selector 
 */
function createNeuronGrid(selector) {
	var $grid = $(selector);

	for (var row = 0; row < GRID_SIZE; ++row) {
		var $row = createRow(row);
		for (var col = 0; col < GRID_SIZE; ++col) {
			addCellToRow($row, row, col);
		}
		$grid.append($row);
	}
}

/**
 * Creates the Input Grid interface, with cells
 * that respond to clicks and toggle their state
 */
function createGrid() {
	var $grid = $(".draw-grid");

	for (var row = 0; row < GRID_SIZE; ++row) {
		var $row = createRow(row);
		for (var col = 0; col < GRID_SIZE; ++col) {
			addCellToRow($row, row, col);
		}
		$grid.append($row);
	}
	$(document).on("click", ".draw-grid .grid-cell", function (event) {
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
	onCalc ();
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
	onCalc ();
}

function onSaveNetwork(evt, ds, name) {
	const data = brain.map(n => n.save());
	ds.saveData(name, data);
}

function onLoadNetwork(evt, data, ds) {
	brain.forEach((neuron, i) => neuron.load(data[i]))
}

function onLoadGrid(evt, data, ds) {
	grid.load(data);
	updateGrid();
}

function onSaveGrid(evt, ds, name) {
	const data = grid.save();
	ds.saveData(name, data);
}

function createRow(rowNumber) {
	return $('<div class="grid-row"' + ' data-row-number="' + rowNumber + '"></div>');
}

function addCellToRow($row, row, col) {
	$row.append($(`<div class="grid-cell" data-row-number="${row}" data-col-number="${col}"></div>`));
}

function updateCell(col, row) {
	var data = grid.getCell(col, row);
	setCell(col, row, data);

}

function updateGrid() {
	grid.forAllCells((data, col, row) => {
		setCell(col, row, Boolean(data));
	})
}

function setCell(col, row, data) {
	var cell = $(`.draw-grid div.grid-cell[data-row-number="${row}"][data-col-number="${col}"]`);
	cell.toggleClass("on", data);
}

/**
 * Just prints the letters A-Z
 */
function grp() {
	var codeA = "A".charCodeAt(0),
		codeZ = "Z".charCodeAt(0);
	for (var code = codeA; code <= codeZ; code++) {
		var str = String.fromCharCode(code);
		console.log(str);
	}
	$(".select-content")
}


$(initPage);
console.log("percy.js loaded");
