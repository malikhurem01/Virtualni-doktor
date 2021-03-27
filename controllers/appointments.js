const Appointment = require('../models/appointments');
const getDb = require('../util/database').getDb;

exports.make = async (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  const userId = req.session.user._id;
  const subject = req.body.subject;
  const date = req.body.date;
  const phoneNumber = req.body.phoneNumber;
  const location = req.body.location;
  const coronaStatus = req.body.coronaStatus;
  let appointment = new Appointment(
    userId,
    date,
    subject,
    phoneNumber,
    location,
    coronaStatus
  );
  let db = getDb();
  await appointment.save();
  res.redirect('/');
};
