const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const { ensureAuthenticated } = require('./config/auth');
const path = require('path');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
// app.use('/', require('./routes/index.js'));
// app.use('/users', require('./routes/users.js'));
// app.use('/scripts', express.static('scripts'));
// app.get('*',ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );

app.use(express.static(path.join(__dirname, '')));
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes-old/users.js'));
app.use('/scripts', express.static('scripts'));
app.get('*',ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts/index.html'));
  // res.render('angular', {
  //   user: req.user
  // })
});

// app.use('/users', require('./routes/users.js'));
// app.use('/scripts', express.static('scripts'));

// app.use(express.static(path.join(__dirname, '')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
// app.get('*',ensureAuthenticated, (req, res) => {
//   res.sendFile('scripts/index.html');
// });

const PORT = process.env.PORT || 4200;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
