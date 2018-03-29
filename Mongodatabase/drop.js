const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://ec2-18-217-246-148.us-east-2.compute.amazonaws.com/', { poolSize: 10 }).then((client) => {
  console.log('pass')
  const db = client.db('ivydatabase');
  // const collection = db.collection('attractions');
  // collection.drop()
  db.dropDatabase()
  client.close();
})