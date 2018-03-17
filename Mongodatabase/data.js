const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const fakeData = require('./fakeData');


async function addToDb() {
  const clientConnect = await MongoClient.connect('mongodb://localhost/27017')
  const mdb = clientConnect.db('ivydatabase');
  const collection = mdb.collection('question');
  for (let i = 0; i < 4; i += 1) {
    let data = new Date()
    let hour = data.getHours()
    let minute = data.getMinutes()
    let second = data.getSeconds()
    console.log(hour+':'+minute+':'+second)
    await collection.insertMany(fakeData.generateQuestions(i))
    .catch((err) => {
      console.log('Error! Can not seed data '+err)
    });
  }
  // process.exit();
  clientConnect.close();
}

addToDb()


