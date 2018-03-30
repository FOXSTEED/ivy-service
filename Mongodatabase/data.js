const MongoClient = require('mongodb').MongoClient;

let db;
let collection;

MongoClient.connect('mongodb://ec2-18-218-138-62.us-east-2.compute.amazonaws.com/', { poolSize: 10 }).then((client) => {
  console.log('pass')
  db = client.db('ivydatabase');
  collection = db.collection('attractions');
})

const getById = function getById(id, callback) {
  // collection.find().hint({ id }).limit(1).toArray()
  // console.log('dataside')
  // console.time('time')
  console.log(id)
  const a = JSON.parse(id)
  collection.find({ id: a }).toArray()
    .then((data) => {
      // console.timeEnd('time')
      console.log('data',data)
      callback(null, data)
    })
    .catch((err) => {
      callback(err, null)
    })
}
exports.getById = getById;
