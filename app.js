var express = require("express");
var fs = require("fs");

var app = express();

app.listen(8081, function() {
	console.log('listening to port 8081');
});

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	fs.readFile('index.html', function(err, data) {
		if(err) {
			return console.log(err);
		}
		res.send(data.toString());
	});
});