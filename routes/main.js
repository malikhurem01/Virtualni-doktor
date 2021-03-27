const express = require('express');
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const router = express.Router();

router.get('/my-profile', (req, res) => {
  let db = getDb();

  db.collection('appointments')
    .find({
      userId: new mongodb.ObjectID(req.session.user._id)
    })
    .toArray()
    .then(appointments => {
      console.log(appointments);
      res.render('my-profile', {
        isAuthenticated: req.session.isLoggedIn,
        path: '',
        user: req.session.user,
        appointments: appointments
      });
    });
});

router.get('/meeting', (req, res) => {
  res.render('meeting', {
    isAuthenticated: req.session.isLoggedIn,
    path: '',
    user: req.session.user
  });
});

module.exports = router;
