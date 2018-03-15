// import { Mongoose } from 'mongoose';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tripadviser');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('something from mongoose'));

const questionSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  trip: Number,
  username: String,
  firstName: String,
  lastName: String,
  date: String,
  flag: Boolean,
  avatar: String,
  questionText: String,
  answers: Array,
});

const QuestionModel = mongoose.model('Question', questionSchema);


function getAll(callback) {
  QuestionModel.find({}, callback);
}

function getById(id, callback) {
  QuestionModel.find({ trip: id }, callback);
}

function removeAll(callback) {
  QuestionModel.remove({}, callback);
}

async function addToDb(questions, callback) {
  const promise = await QuestionModel.insertMany(questions, callback);
  // console.log('added to database');
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log(hour+':'+minute+':'+second)
  // process.exit();
}


exports.addToDb = addToDb;
exports.getAll = getAll;
exports.getById = getById;
exports.removeAll = removeAll;
exports.QuestionModel = QuestionModel;
