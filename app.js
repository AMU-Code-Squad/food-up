var express = require("express");
var app = express();
app.use(express.static('public'))
var firebase = require("firebase");
var config = {
	apiKey: "AIzaSyB2crF7oigfEGHgCHvkH-fOVVh6NxLXMKs",
	authDomain: "food-up-amu.firebaseapp.com",
	databaseURL: "https://food-up-amu.firebaseio.com",
	storageBucket: "food-up-amu.appspot.com",
  };
  firebase.initializeApp(config);
  

app.get("/", function(req, res){
	res.send("Hi there!");
})

app.listen(process.env.PORT || 3000, function(){
	console.log("Food up Server Started");
});