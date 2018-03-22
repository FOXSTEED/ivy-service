const MongoClient = require('mongodb').MongoClient;

let collection;
MongoClient.connect('mongodb://localhost/').then((client) => {
  const db = client.db('ivydatabase');
  collection = db.collection('attractions');
})

const getById = function getById(id, callback) {
  // collection.find().hint({ id }).limit(1).toArray()
  console.log('dataside')
  console.time()
  collection.find({ id:id }).toArray()
    .then((data) => {
      console.timeEnd()
      callback(null, data)
    })
    .catch((err) => {
      callback(err, null)
    })
}
exports.getById = getById;
