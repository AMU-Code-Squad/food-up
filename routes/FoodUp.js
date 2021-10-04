const express = require('express');
const router = express.Router();
const FoodData = require('../models/foodup');
const middleware = require('../middleware');

//FoodUp route//
//SHOW route//
router.get('/FoodUp', async (_req, res) => {
  try {
    const foodData = await FoodData.find({});
    res.render('food-up/index', { foodData });
  } catch (err) {
    console.log(err);
  }
});

//CREATE food route//
router.get('/FoodUp/new', middleware.isLoggedIn, (_req, res) => {
  res.render('food-up/new');
});

router.post('/FoodUp', middleware.isLoggedIn, async (req, res) => {
  const { name, description, image } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newfoodData = {
    name,
    description,
    image,
    author,
  };
  try {
    await FoodData.create(newfoodData);
    res.redirect('/FoodUp');
  } catch (err) {
    console.log(err);
  }
});

router.get('/FoodUp/:id', (req, res) => {
  FoodData.findById(req.params.id)
    .populate('comments')
    .exec(function (err, foundFoodData) {
      if (err) {
        console.log(err);
      } else {
        res.render('food-up/show', { foundFoodData: foundFoodData });
      }
    });
});

//EDIT food route//
router.get('/FoodUp/:id/edit', middleware.isFoodPostOnwer, function (req, res) {
  FoodData.findById(req.params.id, function (err, foundFoodData) {
    if (err) {
      res.redirect('/FoodUp/' + foodData.id);
    } else {
      res.render('food-up/edit', { foundFoodData: foundFoodData });
    }
  });
});

//UPDATE ROUTE//
router.put('/FoodUp/:id', middleware.isFoodPostOnwer, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;
    const updatedFoodData = {
      name,
      description,
      image,
    };
    await FoodData.findByIdAndUpdate(id, updatedFoodData);
    res.redirect('/FoodUp/' + id);
  } catch (err) {
    res.redirect('/FoodUp');
  }
});

//DELETE ROUTE
router.delete('/FoodUp/:id', middleware.isFoodPostOnwer, function (req, res) {
  FoodData.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/FoodUp');
    }
  });
});

module.exports = router;
