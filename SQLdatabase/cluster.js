const pgp = require('pg-promise')();
const fakeData = require('./fakeDatapostgres.js')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const _ = require('ramda');
console.log('pass1')
const db = pgp({
  port: 5432,
  database: 'postgres',
});

const dbivy = pgp({
  port: 5432,
  database: 'ivydatabase5',
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  db.none('CREATE DATABASE ivydatabase5')
    .then(async () => {
      console.log('Ivydatabase5 created');
      await dbivy.none('CREATE TABLE questions(' +
      'id INTEGER PRIMARY KEY,' +
      'trip INTEGER,' +
      'username TEXT,' +
      'firstname TEXT,' +
      'lastname TEXT,' +
      'date TEXT,' +
      'flag TEXT,' +
      'avatar TEXT,' +
      'questiontext TEXT);')
    })
    .then(async () => {
      console.log('created table questions');
      await dbivy.none('CREATE TABLE answers(' +
      'id INTEGER PRIMARY KEY,' +
      'question_id INTEGER REFERENCES questions,' +
      'firstname TEXT,' +
      'lastname TEXT,' +
      'flag TEXT,' +
      'upvotes TEXT,' +
      'downvotes TEXT,' +
      'answertext TEXT);')
    })
    .then(() => {
      for (let i = 0; i < numCPUs; i += 1) {
        const worker = cluster.fork();
        worker.send(i);
      }
    })
    .then(() => {
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} finished`);
      });
    })
    .catch(() => {
      console.log('something went wrong');
    });
} else {
  process.on('message', async (id) => {
    console.log(`Worker ${process.pid} started`);
    await insertQuestionData(id)
    await insertAnswerData(id)
  });
}

// console.log('pass')

const insertEachQuestionData = async function insertEachQuestionData(dataCollection, count) {
  getTime()
  const cs = new pgp.helpers.ColumnSet(['id', 'trip', 'username', 'firstname', 'lastname', 'date', 'flag', 'avatar', 'questiontext'], { table: 'questions'});
  await dbivy.none(pgp.helpers.insert(dataCollection, cs))
    .then(() => {
      console.log('inserted question! '+count);
    })
    .catch((err) => {
      console.log('can not insert data '+ err);
    });
};

const insertEachAnswerData = async function insertEachAnswerData(dataCollection, count) {
  getTime()
  const cs = new pgp.helpers.ColumnSet(['id', 'question_id', 'firstname', 'lastname', 'flag', 'upvotes', 'downvotes', 'answertext'], { table: 'answers'});
  await dbivy.none(pgp.helpers.insert(dataCollection, cs))
    .then(() => {
      console.log('inserted answer! '+count);
    })
    .catch((err) => {
      console.log('can not insert data '+ err)
    });
};

const size = 50000;
const base = parseInt(3000000 / numCPUs);
const insertTimes = base/size  
const baseAnswer = parseInt(9000000 / numCPUs);
const insertAnswerTimes = baseAnswer/size

const insertQuestionData = async function insertQuestionData(id) {
  for (let i = 0; i < insertTimes; i += 1) {
    await insertEachQuestionData(fakeData.generateQuestions(id*base+i*size, size), i);
  }
}

const insertAnswerData = async function insertAnswerData(id) {
  console.log('pass answer')
  for (let i = 0; i < insertAnswerTimes ; i += 1) {
    await insertEachAnswerData (fakeData.generateAnswers(id*baseAnswer+i*size, size, id, base), i);
  }
  process.exit();
}



function getTime() {
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log(hour+':'+minute+':'+second)
}

