/*
  Model korisnika
  Radi kao nezavisan modul
*/

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(name, lastName, email, password, appointments, joined) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.appointments = appointments;
    this.isAdmin = false;
    this.joined = joined;
  }
  save() {
    let db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then(() => console.log('User has been added to the database.'))
      .catch(err => console.log(err));
  }
  update() {
    let db = getDb();
    return db
      .collection('users')
      .updateOne({ email: this.email }, { $set: this })
      .then(() => console.log('User has been updated.'))
      .catch(err => console.log(err));
  }
  static findById(id) {
    let db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new mongodb.ObjectID(id) })
      .then(() => console.log('User fetched.'))
      .catch(err => console.log(err));
  }
  static deleteById(id) {
    let db = getDb();
    return db
      .collection('users')
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then(() =>
        console
          .log('User has been deleted from the database')
          .catch(err => console.log(err))
      );
  }
}

module.exports = User;
