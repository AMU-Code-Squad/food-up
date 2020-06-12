const express = require("express")
const router  = express.Router()
const foodData = require("../models/foodup")
const Comment = require("../models/comment")


//Comments route//
router.get("/FoodUp/:id/comments/new", isLoggedIn, function(req, res){
	foodData.findById(req.params.id, function(err, foodData){
		if(err){
			console.log(err)
		} else{
			res.render("comments/new", {foodData: foodData})
		}
	})
})

router.post("/FoodUp/:id/comments", isLoggedIn,function(req, res){
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

//isLoggedIn Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router
