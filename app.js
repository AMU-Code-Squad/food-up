const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const foodData = require("./models/foodup")
const Comment = require("./models/comment")
const seedDB = require("./seeds")

seedDB()
mongoose.connect(
	"mongodb://localhost:27017/foodup",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/FoodUp", function(req, res){
	foodData.find({}, function(err, foodData){
		if(err){
			console.log(err)
		}else{
			res.render("food-up/index", {foodData: foodData});
		}
	})
})

app.post("/FoodUp", function(req, res){
	const name = req.body.name
	const description = req.body.description
	const image = req.body.image
	const newfoodData = {
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
	res.render("food-up/new")
})

app.get("/FoodUp/:id", function(req, res){
	foodData.findById(req.params.id).populate("comments").exec(function(err, foundFoodData){
		if(err){
			console.log(err)
		} else{
			console.log(foundFoodData)
			res.render("food-up/show", {foundFoodData: foundFoodData})
		}
	})
})

app.get("/FoodUp/:id/comments/new", function(req, res){
	foodData.findById(req.params.id, function(err, foodData){
		if(err){
			console.log(err)
		} else{
			res.render("comments/new", {foodData: foodData})
		}
	})
})

app.post("/FoodUp/:id/comments", function(req, res){
	foodData.findById(req.params.id, function(err, foodData){
		if(err){
			console.log(err)
			res.redirect("/FoodUp")
		}
		else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				} else{
					foodData.comments.push(comment)
					foodData.save()
					res.redirect("/FoodUp/" + foodData.id)
				}
			})
		}
	})
})

app.listen(process.env.PORT || 3000, function(){
	console.log("Food up Server Started at PORT: 3000");
});
