var foodData = require("../models/foodup")

// all the middleare goes here
var middlewareObj = {};

middlewareObj.isFoodPostOnwer = function(req, res, next) {
    if(req.isAuthenticated()){
		foodData.findById(req.params.id, function(err, foundFoodData){
			if(err){
				res.redirect("back")
			} else{
				if(foundFoodData.author.id.equals(req.user.id)){
					next()
				} else{
					res.redirect("back")
				}
			}
		})
	}
	else {
		res.redirect("back")
	}
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = middlewareObj;