module.exports = function(size) {
	// Fetch basic data from model
	var f = require("fetch");
	var obj = JSON.parse(f("models/board.json"));
	if (typeof(size) != typeof(undefined)) {
		obj.size = size;
	}
	
	// Initialize the board
	obj.state = [];
	for (var i  = 0; i < obj.size; i++) {
		var row = [];
		for (var j = 0; j < obj.size; j++) {
			row.push("");
		}
		obj.state.push(row);
	}

	// Append object behaviors
	obj.render = function() {
		var isDraw = obj.isCatsGame();
		var content = "<table class=\"toxboard" + (isDraw ? " catsgame\">" : "\">");
		for (var i = obj.size - 1; i >= 0; i--) {
			content += "<tr>";
			content += "<td class=\"indexCell\">" + i + "</td>";
			for (var j = 0; j < obj.size; j++) {
				var classes = "toxsquare";
				var state = obj.state[j][i];
				var cmd = "return false;";
				if (isDraw) {
				} else if (obj.winningStreak.length > 0) {
				} else if (state == "X") {
				} else if (state == "O") {
				} else if (obj.winningStreak.length == 0) {
					classes += " clickable";
					cmd = "Tox.move(" + j + "," + i + ");";
				}
				if (obj.isInStreak(j,i)) {
					classes += " winning" + state;
				}
				content += "<td class=\"" + classes + "\" onclick=\"" + cmd + "\">" + state + "</td>";
			}
			content += "</tr>";
		}
		content += "<tr><td></td>";
		for (var j = 0; j < obj.size; j++) {
			content += "<td class=\"indexCell\">" + j + "</td>";
		}
		content += "</tr>";
		content += "</table>";
		return content;
	};
	obj.isWin = function(side) {
		// Recurse to check both sides
		if (typeof(side) == typeof(undefined)) {
			if (obj.isWin("O")) {
				return "O";
			} else if (obj.isWin("X")) {
				return "X";
			} else {
				return false;
			}
		}
		var isStreak = true;
		var ndx = 0;
		var coords = [];

		// Check all columns
		for (var i = 0; i < obj.size; i++) {
			isStreak = true;
			ndx = 0;
			coords = [];
			while (ndx < obj.size && isStreak) {
				isStreak = obj.state[ndx][i] == side;
				coords.push([ndx,i]);
				ndx++;
			}
			if (isStreak) {
				obj.winningStreak = coords;
				return true;
			}
		}
		
		// Check all rows
		for (var i = 0; i < obj.size; i++) {
			isStreak = true;
			ndx = 0;
			coords = [];
			while (ndx < obj.size && isStreak) {
				isStreak = obj.state[i][ndx] == side;
				coords.push([i,ndx]);
				ndx++;
			}
			if (isStreak) {
				obj.winningStreak = coords;
				return true;
			}
		}

		// Check UL-BR diagonals
		isStreak = true;
		ndx = 0;
		coords = [];
		while (ndx < obj.size && isStreak) {
			isStreak = obj.state[ndx][ndx] == side;
			coords.push([ndx,ndx]);
			ndx++;
		}
		if (isStreak) {
			obj.winningStreak = coords;
			return true;
		}

		// Check all UR-BL diagonals
		isStreak = true;
		ndx = 0;
		coords = [];
		while (ndx < obj.size && isStreak) {
			isStreak = obj.state[ndx][obj.size-ndx-1] == side;
			coords.push([ndx,obj.size-ndx-1]);
			ndx++;
		}
		if (isStreak) {
			obj.winningStreak = coords;
			return true;
		}
		
		// Didn't find any streaks
		return false;
	};
	obj.isInStreak = function(i,j) {
		var result = false;
		obj.winningStreak.forEach(function(val,ndx,arr) {
			if (val[0] == i && val[1] == j) {
				result = true;
			}
		});
		return result;
	};
	obj.isCatsGame = function() {
		if (obj.winningStreak.length > 0) { return false; }
		for (var i = 0; i < obj.size; i++) {
			for (var j = 0; j < obj.size; j++) {
				if (obj.state[i][j] == "") {
					return false;
				}
			}
		}
		return true;
	};
	
	// Return new object
	return obj;
}
