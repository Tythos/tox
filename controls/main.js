window.addEventListener("load", function() {
	// Load dependencies
	var f = require("fetch");
	var e = require("elsel");
	var hb = require("handlebars");
	
	// Grab model data
	var data = JSON.parse(f("models/carriers.json"));
	
	// Create handlebars template
	var template = hb.compile(f("visuals/supercarrier.html"));
	
	// Populate main content with compiled content
	e("#content").innerHTML = template(data);
});
