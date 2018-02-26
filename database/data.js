const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/27017');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('something from mongoose');
});

const questionSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true, // remember duplicates!
  },
  questions: [],
});

const QuestionModel = mongoose.model('Question', questionSchema);

function addToDb(question, callback) {
  console.log(question, 'from database');

  QuestionModel.create(question, callback);
}

function getAll(callback) {
  QuestionModel.find({}, callback);
}

exports.addToDb = addToDb;
exports.getAll = getAll;
