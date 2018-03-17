const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const fakeData = require('./fakeData');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const _ = require('ramda');

const base = parseInt(3000000 / numCPUs);
const size = 10000; 

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i += 1) {
    const worker = cluster.fork();
    worker.send(i);
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  process.on('message', (id) => {
    addToDb(id);
    console.log(`Worker ${process.pid} started`);
  });
}

function getTime() {
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log(hour+':'+minute+':'+second)
}


function addToDb(id) {
  MongoClient.connect('mongodb://localhost/').then(async (client) => {
    const db = client.db('ivydatabase2');
    const collection = db.collection('questions');
    let count = 0
    const insertTimes = base/size
    async function insertBulk() {
      await collection.insertMany(fakeData.generateQuestions(id*base+count*size, size))
        .catch((err) => {
          console.log('Error! Can not seed data '+err)
        })
      count += 1 
      if (insertTimes > count) {
        insertBulk()
      } else {
        getTime()
        client.close();
        process.exit();
      }
    }
    getTime()
    // console.time('time')
    insertBulk()
  })
    .catch(() => {
      console.log('something went wrong')
    })
}