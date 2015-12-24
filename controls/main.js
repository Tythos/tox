window.addEventListener("load", function() {
	// Load dependencies
	var f = require("fetch");
	var e = require("elsel");
	var hb = require("handlebars");
	var TB = require("ToxBoard");
	
	// External application interface
	Tox = {};
	
	// Instantiate board object and bind global methods
	tb = TB();
	Tox.move = function(x,y) {
		if (tb.moves.length % 2 == 0) {
			next = "X";
		} else {
			next = "O";
		}
		tb.state[x][y] = next;
		tb.moves.push([x,y]);
		var winner = tb.isWin();
		if (winner) {
			console.log("The winner is " + winner + "!");
		} else if (tb.isCatsGame()) {
			console.log("Draw!");
		}
		e("#content").innerHTML = tb.render();
	};
	e("#content").innerHTML = tb.render();
});
