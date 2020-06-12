const express = require("express")
const router  = express.Router()
const foodData = require("../models/foodup")


//FoodUp route//
router.get("/FoodUp", function(req, res){
	foodData.find({}, function(err, foodData){
		if(err){
			console.log(err)
		}else{
			res.render("food-up/index", {foodData: foodData});
		}
	})
})

router.get("/FoodUp/new", isLoggedIn, function(req, res){
	res.render("food-up/new")
})

router.post("/FoodUp", isLoggedIn, function(req, res){
	const name = req.body.name
	const description = req.body.description
	const image = req.body.image
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	const newfoodData = {
		name: name, 
		description: description, 
		image:  image,
		author: author
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

router.get("/FoodUp/:id", function(req, res){
	foodData.findById(req.params.id).populate("comments").exec(function(err, foundFoodData){
		if(err){
			console.log(err)
		} else{
			console.log(foundFoodData)
			res.render("food-up/show", {foundFoodData: foundFoodData})
		}
	})
})


//isLoggedIn middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router
