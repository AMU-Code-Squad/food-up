let express = require("express");
let app = express();
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
let foodData = require("./models/foodup")
let seedDB = require("./seeds")

seedDB()
mongoose.connect(
	"mongodb://localhost:27017/foodup",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/FoodUp", function(req, res){
	foodData.find({}, function(err, foodData){
		if(err){
			console.log(err)
		}else{
			res.render("index", {foodData: foodData});
		}
	})
})

app.post("/FoodUp", function(req, res){
	let name = req.body.name
	let description = req.body.description
	let image = req.body.image
	let newfoodData = {
		name: name, 
		description: description, 
		image:  image
	}
	// foodData.push(newfoodData)
	foodData.create(newfoodData, function(err, newfoodData){
		if(err){
			console.log(err)
		} else{
			res.redirect("/FoodUp")
		}
	})
})

app.get("/FoodUp/new", function(req, res){
	res.render("new")
})

app.get("/FoodUp/:id", function(req, res){
	foodData.findById(req.params.id, function(err, foundFoodData){
		if(err){
			console.log(err)
		} else{
			res.render("show", {foundFoodData: foundFoodData})
		}
	})
})

app.listen(process.env.PORT || 3000, function(){
	console.log("Food up Server Started at PORT: 3000");
});