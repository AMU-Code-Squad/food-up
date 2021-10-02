//Requiring Dependencies//
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const User = require('./models/user');

/* Commneting seedDB call for testing purpose
You can uncomment seedDB() for some sample database
But I will recommend to make your own as it will
help you to create proper author associations.
Currently authors are used in seedDB with fake id
and that can be buggy for the application
*/
// const seedDB = require('./seeds');
// seedDB()

//Using Dependencies
mongoose.connect('mongodb://localhost:27017/foodup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(
  expressSession({
    secret: 'slfsjfhkdshgkfdsh',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

//Initializing Passport//
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/FoodUp'));
app.use(require('./routes/comments'));

app.use((req, res, next) => {
  res.status(404).render('error');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Food up Server Started at PORT: 3000');
});
