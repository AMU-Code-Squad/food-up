let express = require("express");
let app = express();
let bodyParser = require("body-parser")
let foodData = [
	{name: "Cheese Burger", image: "https://live.staticflickr.com/4126/4984075705_c83583e4ed_b.jpg"},
	{name: "Chesse Pizza", image: "https://farm5.staticflickr.com/4008/4393075240_2066a34018_b.jpg"},
	{name: "Cheese Sandwich", image: "https://live.staticflickr.com/2881/11455954055_4a0573111b_b.jpg"},
	{name: "Chesse Pizza", image: "https://farm5.staticflickr.com/4008/4393075240_2066a34018_b.jpg"},
	{name: "Cheese Sandwich", image: "https://live.staticflickr.com/2881/11455954055_4a0573111b_b.jpg"},
	{name: "Cheese Burger", image: "https://live.staticflickr.com/4126/4984075705_c83583e4ed_b.jpg"},
	{name: "Chesse Pizza", image: "https://farm5.staticflickr.com/4008/4393075240_2066a34018_b.jpg"},
] 

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/FoodUp", function(req, res){
	res.render("food", {foodData: foodData});
})

app.post("/FoodUp", function(req, res){
	let name = req.body.name
	let image = req.body.image
	let newfoodData = {name: name, image:  image}
	foodData.push(newfoodData)
	res.redirect("/FoodUp")
})

app.get("/FoodUp/new", function(req, res){
	res.render("new")
})

app.listen(process.env.PORT || 3000, function(){
	console.log("Food up Server Started");
});