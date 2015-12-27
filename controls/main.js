window.addEventListener("load", function() {
	// Load dependencies
	var f = require("fetch");
	var e = require("elsel");
	var hb = require("handlebars");
	var TB = require("ToxBoard");
	
	// External application interface
	Tox = {};
	var newGameLink = "<a href=\"main.html\" onclick=\"tb.reset();return false;\">New Game?</a>";
	
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
		e("#content").innerHTML = tb.render();
		if (winner) {
			e("#footer").innerHTML = "The winner is " + winner + "!<br/>" + newGameLink;
		} else if (tb.isCatsGame()) {
			e("#footer").innerHTML = "Draw!<br/>" + newGameLink;
		}
	}
	e("#content").innerHTML = tb.render();
});
