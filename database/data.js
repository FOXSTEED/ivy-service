const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/27017');
// mongoose.connect('mongodb://database/27017');

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

function addToDb(questions, callback) {
  const promise = QuestionModel.create(questions, callback);
  promise.then(() => {
    console.log('added to database');
    process.exit();
  });
}

function getAll(callback) {
  QuestionModel.find({}, callback);
}

function getById(id, callback) {
  QuestionModel.findOne({ id: id }, callback);
}

function removeAll(callback) {
  QuestionModel.remove({}, callback);
}

exports.addToDb = addToDb;
exports.getAll = getAll;
exports.getById = getById;
exports.removeAll = removeAll;
exports.QuestionModel = QuestionModel;

