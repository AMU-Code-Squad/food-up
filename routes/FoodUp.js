const express = require("express")
const router  = express.Router()
const foodData = require("../models/foodup")


//FoodUp route//
//SHOW route//
router.get("/FoodUp", function(_req, res){
	foodData.find({}, function(err, foodData){
		if(err){
			console.log(err)
		}else{
			res.render("food-up/index", {foodData: foodData});
		}
	})
})

//CREATE food route//
router.get("/FoodUp/new", isLoggedIn, function(_req, res){
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
	foodData.create(newfoodData, function(err, _newfoodData){
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

//EDIT food route//
router.get("/FoodUp/:id/edit",isLoggedIn, function(req, res){
    foodData.findById(req.params.id, function(err, foundFoodData){
		if(err){
			res.redirect("/FoodUp/" + foodData.id)
		} else{
			res.render("food-up/edit", {foundFoodData: foundFoodData})
		}
	})
})

//UPDATE ROUTE//
router.put("/FoodUp/:id", function(req, res){
	const updatedFoodData = {
		name: req.body.name,
		description: req.body.description,
		image: req.body.image
	}
    foodData.findByIdAndUpdate(req.params.id, updatedFoodData, function(err, updatedFoodData){
        if(err){
            res.redirect("/FoodUp")
        } else{
            res.redirect("/FoodUp/" + req.params.id)
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
