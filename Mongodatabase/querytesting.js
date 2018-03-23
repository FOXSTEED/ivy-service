const MongoClient = require('mongodb').MongoClient;
const performance = require('performance');
const results = performance.runBenchmarks();



let collection;

MongoClient.connect('mongodb://localhost/').then((client) => {
  const db = client.db('ivydatabase');
  collection = db.collection('attractions');
})

const getById = async function getById(id, callback) {
  // collection.find().hint({ id }).limit(1).toArray()
  await collection.find({ id:id }).toArray()
    .then((data) => {
      callback(null, data)
    })
    .catch((err) => {
      callback(err, null)
    })
}

function getRandomNumBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + min));
}
async function testingMongo() {
  let totalTime = 0;
  for (let i = 0; i < 10; i += 1) {
    const num = getRandomNumBetween(1, 10000000)
    const t0 = performance.now();
    await getById(num)
    const t1 = performance.now();
    const time = t1 - t0
    totalTime += time 
  }
  console.log(totalTime/10)
}
testingMongo()