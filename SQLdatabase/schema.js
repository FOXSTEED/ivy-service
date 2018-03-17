const pgp = require('pg-promise')();
const fakeData = require('./fakeDatapostgres.js')

const db = pgp({
  port: 5432,
  database: 'postgres',
});

const dbivy = pgp({
  port: 5432,
  database: 'ivydatabase',
});
// console.log('pass')

const insertData = async function insertData(dataCollection, count) {
  // console.log('pass 6');
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log('question '+hour+':'+minute+':'+second);
  const cs = new pgp.helpers.ColumnSet(['trip', 'username', 'firstname', 'lastname', 'date', 'flag', 'avatar', 'questiontext'], { table: 'questions'});
  await dbivy.none(pgp.helpers.insert(dataCollection, cs))
    .then(() => {
      console.log('inserted! '+count);
    })
    .catch((err) => {
      console.log('can not insert data '+ err)
    });
};

const insertAnswerData = async function insertData(dataCollection, count) {
  // console.log('pass 8');
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log('answer '+hour+':'+minute+':'+second);
  const cs = new pgp.helpers.ColumnSet(['questionnumber', 'firstname', 'lastname', 'flag','upvotes', 'downvotes', 'answertext'], { table: 'answers'});
  await dbivy.none(pgp.helpers.insert(dataCollection, cs))
    .then(() => {
      console.log('inserted answer! '+count);
    })
    .catch((err) => {
      console.log('can not insert data '+ err)
    });
};


const createTable = function createTable() {
  db.none('CREATE DATABASE ivydatabase')
    .then(async () => {
      console.log('Ivydatabase created');
      await dbivy.none('CREATE TABLE questions(' +
      'id SERIAL PRIMARY KEY,' +
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
      console.log('created questions table');
      for (let i = 0; i < 20; i += 1) {
        await insertData(fakeData.generateQuestions(), i);
      }
    })
    .then(async () => {
      await dbivy.none('CREATE TABLE answers(' +
      'id SERIAL PRIMARY KEY,' +
      'questionnumber INTEGER,' +
      'firstname TEXT,' +
      'lastname TEXT,' +
      'flag TEXT,' +
      'upvotes TEXT,' +
      'downvotes TEXT,' +
      'answertext TEXT);')
    })
    .then(async () => {
      console.log('created answers table');
      for (let i = 0; i < 180; i += 1) {
        await insertAnswerData(fakeData.generateAnswers(), i);
      }
    })
    .catch((err) => {
      console.log('Failed creating database or table', err);
    });
};

createTable();

