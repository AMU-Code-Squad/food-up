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
  try {
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
    await FoodData.create(newfoodData);
    res.redirect('/FoodUp');
  } catch (err) {
    console.log(err);
  }
});

router.get('/FoodUp/:id', async (req, res) => {
  try {
    const foundFoodData = await FoodData.findById(req.params.id)
      .populate('comments')
      .exec();
    res.render('food-up/show', { foundFoodData });
  } catch (err) {
    console.log(err);
  }
});

//EDIT food route//
router.get('/FoodUp/:id/edit', middleware.isFoodPostOnwer, async (req, res) => {
  const { id } = req.params;
  try {
    const foundFoodData = await FoodData.findById(req.params.id);
    res.render('food-up/edit', { foundFoodData });
  } catch (err) {
    res.redirect('/FoodUp/' + id);
  }
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
router.delete('/FoodUp/:id', middleware.isFoodPostOnwer, async (req, res) => {
  try {
    await FoodData.findByIdAndRemove(req.params.id);
    res.redirect('/FoodUp');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
