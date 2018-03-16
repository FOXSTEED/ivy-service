const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

let mdb;
let collection;
MongoClient.connect('mongodb://localhost/27017')
  .then(() => {
    mdb = clientConnect.db('ivydatabase');
    collection = mdb.collection('guests');
  });

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


// function getAll(callback) {
//   QuestionModel.find({}, callback);
// }

// function getById(id, callback) {
//   QuestionModel.find({ trip: id }, callback);
// }

// function removeAll(callback) {
//   QuestionModel.remove({}, callback);
// }

async function addToDb(questions) {
  const promise = await collection.insertMany(questions, callback);
  promise.catch((err)=>{
    console.log('Error! Can not seed data '+err)
  })
  // console.log('added to database');
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log(hour+':'+minute+':'+second)
  // process.exit();
}


exports.addToDb = addToDb;
// exports.getAll = getAll;
// exports.getById = getById;
// exports.removeAll = removeAll;
// exports.QuestionModel = QuestionModel;
