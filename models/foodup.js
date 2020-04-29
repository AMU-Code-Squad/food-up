let mongoose = require("mongoose")

let foodDataSchema = new mongoose.Schema({
	name: String,
	description: String,
    image: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
})

let foodData = mongoose.model("foodData", foodDataSchema)

module.exports = foodData