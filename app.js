const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoConnect = require('./util/database').mongoConnect;
const getDb = require('./util/database').getDb;
const User = require('./models/user');

const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/appointments');
const mainRoutes = require('./routes/main');
const app = express();

const store = new MongoDBStore({
  uri:
    'mongodb+srv://malik:pokloniba@pokloni.zso6v.mongodb.net/Virtual?retryWrites=true&w=majority',
  collection: 'sessions'
});

app.use(
  session({
    secret: 'My Secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(appRoutes);
app.use(authRoutes);
app.use(mainRoutes);

app.get('/', (req, res) => {
  res.render('index', {
    isAuthenticated: req.session.isLoggedIn,
    user: req.session.user ? req.session.user : false,
    path: '/'
  });
});

mongoConnect().then(() => {
  app.listen(3000);
});
