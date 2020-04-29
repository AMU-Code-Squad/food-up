let mongoose = require("mongoose")

let foodDataSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String,
})

let foodData = mongoose.model("foodData", foodDataSchema)

module.exports = foodData