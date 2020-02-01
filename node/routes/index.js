const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const path = require('path');

router.get('/', forwardAuthenticated, (req, res) => {
  // res.render('home')
  res.redirect('/users/login')
});

router.get('/app', ensureAuthenticated, (req, res) =>
  // res.render('angular', {
  //   user: req.user
  // })
  res.sendFile(path.join(__dirname, 'scripts/index.html'))

);

module.exports = router;
