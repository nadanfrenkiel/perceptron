//http-server -p 5555
"use strict";



function findTheGradient(startRGB, endRGB, normNum) {
	//(endRGB - startRGB) * normNum + startRGB
	var middleRed = (endRGB.red - startRGB.red) * normNum + startRGB.red,
		middleGreen = (endRGB.green - startRGB.green) * normNum + startRGB.green,
		middleBlue = (endRGB.blue - startRGB.blue) * normNum + startRGB.blue;

	return fromRGB (middleRed, middleGreen, middleBlue)
}

/**
 * Accepts three values and returns an RGBColor instance
 * @param {*} r ed
 * @param {*} g een
 * @param {*} b ule
 * @returns 
 */

function fromRGB(r, g, b) {
	var ret = new RGBColor();
	ret.blue = b;
	ret.green = g;
	ret.red = r;

	return ret;
}

/**
 * Receives a string or an instance of RGBColor
 * Returns a matching instance of RGBColor
 * @param {*} color 
 * @returns 
 */
function toRGB(color) {
	if (color instanceof RGBColor) {
		return color;
	}
	if (typeof color === "string") {
		return new RGBColor(color);
	}
	throw new Error("toRGB: Illegal parameter", color);
}


class Colororo {
	constructor (color1, color2) {
		this.startColor = toRGB(color1);
		this.endColor = toRGB(color2);
	}
	
	getGradient (factor) { 
		return findTheGradient (this.startColor, this.endColor,factor)
	}
}


class RGBColor {
	constructor(str) {
		this.setColor(str);
	}

	setColor(str) {
		var rawColor = (str || "").replace('#', '');
		if (rawColor.length === 6) {
			this.red = parseInt(rawColor.substring(0, 2), 16);
			this.green = parseInt(rawColor.substring(2, 4), 16);
			this.blue = parseInt(rawColor.substring(4, 6), 16);
		}
		else {
			this.red = this.blue = this.green = 0;
		}
	}

	toString() {
		return `Red: ${this.red}, Green: ${this.green}, Blue: ${this.blue}`;
	}

	toRGB() {
		return `rgb(${this.red} ${this.green} ${this.blue})`;
	}

	toHEX() {
		return `#${this.toHEXDigit(this.red)}${this.toHEXDigit(this.green)}${this.toHEXDigit(this.blue)}}`
	}

	toHEXDigit(c) {
		var ret = c.toString(16);
		return ret.length > 1 ? ret : '0' + ret;
	}
}
