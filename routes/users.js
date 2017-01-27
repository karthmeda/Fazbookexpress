var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('users/index', { title: 'fazbook' });
// });

// New users
router.get('/new', function(req, res, next) {
  res.render('users/new', { title: 'new users' });
});

router.get('/', function(req, res, next) {
  models.User.findAll({}).then(function(users) {
    res.render('users/index', {
      title: 'fazbook',
      users: users
    });
  });
});

//Posts data from input form to database
router.post('/', function(req, res, next) {
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(function() {
    res.redirect('/users')
  });
});

//route to specify what happens on press of delete submit button
router.delete('/:id', function(req, res, next) {
  models.User.destroy({
    where: { id: req.params.id }
  }).then(function(user) {
    res.redirect('/users');
  });
});


//routes user to entire user profile info on click of View User page link on main page
router.get('/show/:id', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/show', { user: user, title: user.firstName });
  });
});

//routes to edit view with input fields prepopulated with previously inputted information
router.get('/:id/edit', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/edit', { user: user });
  });
});

//this function handles what happens on submit of editing users information
router.put('/:id', function(req, res, next) {
  models.User.update({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/users/');
  });
});


module.exports = router;
