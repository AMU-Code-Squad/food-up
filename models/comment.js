const mongoose = require("mongoose");
     
const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
 
const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
