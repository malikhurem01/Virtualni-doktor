/*
    Model termina
    Radi kao nezavisan modul
*/

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Appointment {
  constructor(userId, date, subject, phoneNumber, location, coronaStatus) {
    this.userId = userId;
    this.date = date;
    this.subject = subject;
    this.phoneNumber = phoneNumber;
    this.location = location;
    this.coronaStatus = coronaStatus;
  }
  save() {
    let db = getDb();
    return db
      .collection('appointments')
      .insertOne(this)
      .then(() => console.log('Appointment has been added to the database.'))
      .catch(err => console.log(err));
  }
  update() {
    let db = getDb();
    return db
      .collection('appointments')
      .updateOne({ email: this.email }, { $set: this })
      .then(() => console.log('Appointment has been updated.'))
      .catch(err => console.log(err));
  }
  static findById(id) {
    let db = getDb();
    return db
      .collection('appointments')
      .findOne({ _id: new mongodb.ObjectID(id) })
      .then(() => console.log('Appointment fetched.'))
      .catch(err => console.log(err));
  }
  static deleteById(id) {
    let db = getDb();
    return db
      .collection('appointments')
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then(() =>
        console
          .log('Appointment has been deleted from the database')
          .catch(err => console.log(err))
      );
  }
}

module.exports = Appointment;
