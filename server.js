var http = require("http");
var fs = require("fs");
var path = require("path");

var hostIp = "127.0.0.1";
var portNumber = 1337;

var typeMap = {
	".html": "text/html",
	".css": "text/css",
	".jpg": "image/jpeg",
	".json": "text/javascript",
	".js": "text/javascript"
};

http.createServer(function(req, res) {
	var filePath = __dirname + "/" + req.url;
	if (!fs.existsSync(filePath)) {
		filePath = __dirname + "/" + "main.html";
	}
	var stats = fs.lstatSync(filePath);
	if (!stats.isFile()) {
		filePath = __dirname + "/" + "main.html";
		stats = fs.lstatSync(filePath);
	}
	res.writeHead(200, {
		'Content-Type': typeMap[path.extname(filePath)],
		'Content-Length': stats.size
	});
	var rs = fs.createReadStream(filePath);
	rs.pipe(res);
}).listen(portNumber, hostIp);
console.log("Server running at " + hostIp + ":" + portNumber);
