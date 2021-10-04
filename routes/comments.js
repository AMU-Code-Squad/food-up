const express = require('express');
const router = express.Router();
const foodData = require('../models/foodup');
const Comment = require('../models/comment');
const middleware = require('../middleware');

//Comments route//
router.get(
  '/FoodUp/:id/comments/new',
  middleware.isLoggedIn,
  async (req, res) => {
    try {
      const foodData = await foodData.findById(req.params.id);
      res.render('comments/new', { foodData });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post('/FoodUp/:id/comments', middleware.isLoggedIn, async (req, res) => {
  try {
    const foodData = await foodData.findById(req.params.id);
    const comment = await Comment.create(req.body.comment);
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    await comment.save();

    foodData.comments.push(comment);
    await foodData.save();

    res.redirect('/FoodUp/' + foodData.id);
  } catch (err) {
    console.log(err);
    res.redirect('/FoodUp');
  }
});

module.exports = router;
