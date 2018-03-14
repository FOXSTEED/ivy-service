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
  questions: [],
});

const QuestionModel = mongoose.model('Question', questionSchema);


function getAll(callback) {
  QuestionModel.find({}, callback);
}

function getById(id, callback) {
  QuestionModel.findOne({ id: id }, callback);
}

function removeAll(callback) {
  QuestionModel.remove({}, callback);
}

async function addToDb(questions, callback) {
  // const data1 = new Date()
  // const hour1 = data1.getHours()
  // const minute1 = data1.getMinutes()
  // const second1 = data1.getSeconds()
  // console.log(hour1+':'+minute1+':'+second1)
  const promise = await QuestionModel.create(questions, callback);
  // console.log('added to database');
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log(hour+':'+minute+':'+second)
  // mongoose.disconnect();
  // process.exit();
}

function stopDb(questions, callback) {
  mongoose.disconnect()
}

exports.addToDb = addToDb;
exports.getAll = getAll;
exports.getById = getById;
exports.removeAll = removeAll;
exports.QuestionModel = QuestionModel;

