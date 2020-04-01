var express = require("express");
var app = express();
app.use(express.static('public'))

app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/FoodUp", function(req, res){
	let foodData = [
		{name: "Cheese Burger", image: "https://pixabay.com/get/57e2d64b4856ab14f1dc8460cf2934771438dbf85254794c72297ed09f4c_340.jpg"},
		{name: "Chesse Pizza", image: "https://pixabay.com/get/57e2d64a4a55ab14f1dc8460cf2934771438dbf85254794c72297ed19445_340.jpg"},
		{name: "Cheese Sandwich", image: "https://pixabay.com/get/57e8d3444852a414f1dc8460cf2934771438dbf85254794c72297ed19f4f_340.jpg"}
	] 
	res.render("food", {foodData: foodData});
})

app.listen(process.env.PORT || 3000, function(){
	console.log("Food up Server Started");
});