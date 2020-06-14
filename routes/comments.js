const express = require("express")
const router  = express.Router()
const foodData = require("../models/foodup")
const Comment = require("../models/comment")
const middleware = require("../middleware")

//Comments route//
router.get("/FoodUp/:id/comments/new", middleware.isLoggedIn, function(req, res){
	foodData.findById(req.params.id, function(err, foodData){
		if(err){
			console.log(err)
		} else{
			res.render("comments/new", {foodData: foodData})
		}
	})
})

router.post("/FoodUp/:id/comments", middleware.isLoggedIn,function(req, res){
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
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					comment.save()
					foodData.comments.push(comment)
					foodData.save()
					res.redirect("/FoodUp/" + foodData.id)
				}
			})
		}
	})
})

module.exports = router
