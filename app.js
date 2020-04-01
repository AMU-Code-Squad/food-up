var express = require("express");
var app = express();
app.use(express.static('public'))

app.get("/", function(req, res){
	res.send("Hi there!");
})

app.listen(process.env.PORT || 3000, function(){
	console.log("Food up Server Started");
});