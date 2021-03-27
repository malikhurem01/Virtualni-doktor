//Database koju smo koristili je MongoDB Atlas.. Svi podaci se pohranjuju i čitaju iz jedne baze.

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = () => {
  return MongoClient.connect(
    'mongodb+srv://malik:pokloniba@pokloni.zso6v.mongodb.net/Virtual?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log(client);
      _db = client.db();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
const getDb = () => {
  if (_db) return _db;
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
