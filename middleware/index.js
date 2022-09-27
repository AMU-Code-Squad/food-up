const foodData = require('../models/foodup');

// all the middleare goes here
var middlewareObj = {};

middlewareObj.isFoodPostOnwer = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('back');
  }

  try {
    const foundFoodData = await foodData.findById(req.params.id);
    if (foundFoodData.author.id.equals(req.user.id)) {
      next();
    } else {
      res.redirect('back');
    }
  } catch (err) {
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error","Plese Login First!!");
  res.redirect('/login');
};

module.exports = middlewareObj;
