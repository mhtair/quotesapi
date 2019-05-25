//Routing Mechanism - URL Define Here.
const express = require('express');

//Object of Express
const app = express();
app.use(express.static('views'))

//File Stream to Read Quotes from file
//I am not using db faster execution :p
var fs = require("fs");

app.get('/', (req, res) => {
	
	fs.readFile("quotes.db", function(err, buf) {
		var qarr=JSON.parse(buf);
		var random=Math.floor(Math.random()*(qarr.length-1));
		//Allow API
		res.setHeader('Access-Control-Allow-Origin', '/');
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);
		res.response(qarr[random]);
	});
});


//Httpserver Port Number 3000.
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//Set The File Type To App As EJS.
app.set('view engine', 'ejs');