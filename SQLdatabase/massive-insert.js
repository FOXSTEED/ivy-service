const pgp = require('pg-promise')({
  capSQL: true
});
const fakeData = require('./fakeDataGenerator.js')

const db = pgp({
  port: 5432,
  database: 'postgres',
});

const dbivy = pgp({
  port: 5432,
  database: 'ivydatabase',
});


const makeReady = async function makeReady() {
  await db.none('CREATE DATABASE ivydatabase')
    .then(async () => {
      console.log('Ivydatabase created');
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
    .catch((err) => {
      console.log('something went wrong when make ready', err);
    });
};

function getTime() {
  let data = new Date()
  let hour = data.getHours()
  let minute = data.getMinutes()
  let second = data.getSeconds()
  console.log(hour+':'+minute+':'+second)
}

const csQ = new pgp.helpers.ColumnSet(['id', 'trip', 'username', 'firstname', 'lastname', 'date', 'flag', 'avatar', 'questiontext'], { table: 'questions'});
const csA = new pgp.helpers.ColumnSet(['id', 'question_id', 'firstname', 'lastname', 'flag', 'upvotes', 'downvotes', 'answertext'], { table: 'answers'});
const size = 10000;
db.tx((t) => {
  return t.batch([
    db.task(async () => {
      await makeReady()
      getTime()
      await db.tx('massive-insert', (t) => {
        return t.sequence((index) => {
          console.log('inserting the ', index*10000, ' data to questions table')
          return fakeData.generateQuestions(t, index, size)
            .then((data) => {
              if (data) {
                const insert = pgp.helpers.insert(data, csQ);
                return dbivy.none(insert);
              }
            })
            .catch((error) => {
              getTime()
              console.log('can not insert data to questions table', error)
            })
        });
      })
      db.tx('massive-insert', (t) => {
        return t.sequence((index) => {
          console.log('inserting the ', index*10000, ' data to answers table')
          return fakeData.generateAnswers(t, index, size)
            .then((data) => {
              if (data) {
                const insert = pgp.helpers.insert(data, csA);
                return dbivy.none(insert);
              }
            })
            .catch((error) => {
              getTime()
              console.log('can not insert data to answers table', error)
            })
        });
      })
    }),
  ]);
})
  .catch((error) => {
    console.log('something went wrong')
  });

