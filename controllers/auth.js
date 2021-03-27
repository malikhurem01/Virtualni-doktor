const User = require('../models/user');
const getDb = require('../util/database').getDb;
const bcrypt = require('bcryptjs');
exports.getLogin = (req, res, next) => {
  res.render('login', { isAuthenticated: false, path: '/login', error: false });
};
exports.postLogin = (req, res, next) => {
  if (!req.body.password) {
    return res.render('login', {
      isAuthenticated: false,
      path: '/login',
      error: true
    });
  }
  let db = getDb();
  db.collection('users')
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.render('login', {
          isAuthenticated: false,
          path: '/login',
          error: true
        });
      }
      bcrypt.compare(req.body.password, user.password).then(doMatch => {
        if (doMatch) {
          req.session.user = user;
          req.session.isLoggedIn = true;
          return req.session.save(err => {
            console.log(err);
            return res.redirect('/');
          });
        }
        return res.render('login', {
          isAuthenticated: false,
          path: '/login',
          error: true
        });
      });
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Nema sesije');
    }
    console.log('Logged out');
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('signup', {
    isAuthenticated: false,
    path: '/signup',
    error: false
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const joined = Date.now();
  let db = getDb();
  db.collection('users')
    .findOne({ email: email })
    .then(user => {
      if (user) {
        return res.render('signup', {
          isAuthenticated: false,
          path: '/signup',
          error: true
        });
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User(name, lastName, email, hashedPassword, joined);
          return user
            .save()
            .then(() => {
              return res.redirect('/login');
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
};

exports.getMyProfile = (req, res, next) => {
  res.render('profil', {
    pageTitle: 'Pokloni.ba | Moj profil',
    image: null,
    firstName: req.session.user.name,
    lastName: req.session.user.lastName,
    email: req.session.user.email,
    joined: req.session.user.joined
  });
};
