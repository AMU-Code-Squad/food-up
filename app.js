//Requiring Dependencies//
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const expressSession = require("express-session")
const LocalStrategy = require("passport-local")
const methodOverride = require("method-override")
const foodData = require("./models/foodup")
const Comment = require("./models/comment")
const User = require("./models/user")
const seedDB = require("./seeds")

//Requiring Routes//
const commentRoutes = require("./routes/comments")
const foodUpRoutes = require("./routes/FoodUp")
const indexRoute = require("./routes/index")

seedDB()

//Using Dependencies
mongoose.connect(
	"mongodb://localhost:27017/foodup",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride("_method"))
app.use(expressSession({
    secret: "slfsjfhkdshgkfdsh",
    resave: false,
    saveUninitialized: false
}))


//Initializing Passport//
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set("view engine", "ejs")

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

//Using Routes//
app.use(indexRoute)
app.use(foodUpRoutes)
app.use(commentRoutes)

app.listen(process.env.PORT || 3000, function(){
	console.log("Food up Server Started at PORT: 3000")
})
