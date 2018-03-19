// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;


let collection;

MongoClient.connect('mongodb://localhost/').then((client) => {
  const db = client.db('ivydatabase2');
  collection = db.collection('questions');
})

const getById = function getById(id, callback) {
  collection.find({ trip: id }).toArray()
    .then((data) => {
      callback(null, data)
    })
    .catch((err) => {
      callback(err, null)
    })
}



// function addToDb(questions, callback) {
//   removeAll((err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('dropped database');
//   })
//   const promise = QuestionModel.create(questions, callback);
//   promise.then(() => {
//     console.log('added to database');
//     process.exit();
//   });
// }

// exports.addToDb = addToDb;
// exports.getAll = getAll;
exports.getById = getById;
// exports.removeAll = removeAll;
// exports.QuestionModel = QuestionModel;