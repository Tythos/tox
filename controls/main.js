window.addEventListener("load", function() {
	// Load dependencies
	var f = require("fetch");
	var e = require("elsel");
	var hb = require("handlebars");
	var TB = require("ToxBoard");
	
	// External application interface
	Tox = {};
	var newGameLink = "<a href=\".\" onclick=\"tb.reset();return false;\">New Game?</a>";
	
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
			e("#content").innerHTML = "The winner is " + winner + "!<br/>" + newGameLink;
		} else if (tb.isCatsGame()) {
			e("#content").innerHTML = "Draw!<br/>" + newGameLink;
		} else {
			e("#content").innerHTML = tb.render();
		}
	}
	e("#content").innerHTML = tb.render();
});
