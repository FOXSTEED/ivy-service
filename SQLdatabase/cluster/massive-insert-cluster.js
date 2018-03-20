const pgp = require('pg-promise')({
  capSQL: true
});
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fakeData = require('./fakeDataGenerator.js')


const db = pgp({
  port: 5432,
  database: 'postgres',
});

const dbivy = pgp({
  port: 5432,
  database: 'ivydatabase3',
});

const makeReady = async function makeReady() {
  await db.none('DROP DATABASE ivydatabase3')
    .then(async () => {
      console.log('Droped database');
      await db.none('CREATE DATABASE ivydatabase3')
    })
    .then(async () => {
      console.log('Ivydatabase created');
      await dbivy.none('CREATE TABLE attractions(' +
    'idp SERIAL PRIMARY KEY,' +
    'id INTEGER UNIQUE);');
    })
    .then(async () => {
      console.log('created table attractions');
      await dbivy.none('CREATE TABLE questions(' +
    'idp SERIAL PRIMARY KEY,' +
    'id INTEGER,' +
    'attraction_id INTEGER REFERENCES attractions(id),' +
    'username TEXT,' +
    'firstname TEXT,' +
    'lastname TEXT,' +
    'date TEXT,' +
    'flag TEXT,' +
    'avatar TEXT,' +
    'questiontext TEXT);');
    })
    .then(async () => {
      console.log('created table questions');
      await dbivy.none('CREATE TABLE answers(' +
    'id INTEGER PRIMARY KEY,' +
    'question_id INTEGER REFERENCES questions,' +
    'firstname TEXT,' +
    'lastname TEXT,' +
    'flag TEXT,' +
    'answertext TEXT);');
    })
    .catch((err) => {
      console.log('something went wrong when make ready', err);
    });
};

const seedAttractions = async function seedAttractions() {
  const csAt = new pgp.helpers.ColumnSet(['id'], { table: 'attractions'})
  const size = 3;
  await db.tx('massive-insert', (t) => {
    return t.sequence((index) => {
      console.log('inserting the ', index*10000, ' data to attractions table')
      return fakeData.generateAttractions(t, index, size)
        .then((data) => {
          console('attraction')
          if (data.length === 0) {
            return;
          }
          if (data) {
            // console.log('seeding attraction', index*size)
            const insert = pgp.helpers.insert(data, csAt);
            return dbivy.none(insert);
          }
        })
        .catch((error) => {
          console.log('can not insert data to attractions table', error)
        })
    })
      .then(async () => {
        console.log('creating attractions index')
        await dbivy.none('CREATE INDEX index_attractions ON attractions(id)');
        process.exit();
      })
      .catch((error) => {
        console.log('can not insert data to attractions table', error)
      })
  })
    .catch((error) => {
      console.log('can not insert data to attractions table', error)
    })
}

const seedQuestions = async function seedQuestions() {
  const csQ = new pgp.helpers.ColumnSet(['id', 'attraction_id', 'username', 'firstname', 'lastname', 'date', 'flag', 'avatar', 'questiontext'], { table: 'questions'});
  const size = 3;
  await db.tx('massive-insert', (t) => {
    return t.sequence((index) => {
      console.log('inserting the ', index*10000, ' data to questions table')
      return fakeData.generateQuestions(t, index, size)
        .then((data) => {
          if (data.length === 0) {
            return;
          }
          if (data) {
            console('question')
            const insert = pgp.helpers.insert(data, csQ);
            return dbivy.none(insert);
          }
        })
        .catch((error) => {
          console.log('can not insert data to questions table', error)
        })
    })
      .then(async () => {
        console.log('creating questions index')
        await dbivy.none('CREATE INDEX index_attraction ON questions(attraction_id)');
        process.exit();
      })
      .catch((error) => {
        console.log('can not insert data to attractions table', error)
      })
  })
    .catch((error) => {
      console.log('can not insert data to attractions table', error)
    })
}

const seedAnswers = async function seedAnswers() {
  const csA = new pgp.helpers.ColumnSet(['id', 'question_id', 'firstname', 'lastname', 'flag', 'answertext'], { table: 'answers'});
  const size = 3;
  const size2 = 9;
  await db.tx('massive-insert', (t) => {
    return t.sequence((index) => {
      console.log('inserting the ', index*10000, ' data to answers table')
      return fakeData.generateAnswers(t, index, size2, size)
        .then((data) => {
          if (data.length === 0) {
            return;
          }
          if (data) {
            console('answer')
            const insert = pgp.helpers.insert(data, csA);
            return dbivy.none(insert);
          }
        })
        .catch((error) => {
          console.log('can not insert data to answers table', error)
        })
    })
      .then(async () => {
        // console.log('creating answers index')
        await dbivy.none('CREATE INDEX index_question_id ON answers(question_id)');
        process.exit();
      })
      .catch((error) => {
        console.log('can not insert data to answers table', error)
      })
  })
    .catch((error) => {
      console.log('can not insert data to answers table', error)
    })
}


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  makeReady()
    .then(() => {
      for (let i = 0; i < numCPUs; i += 1) {
        const worker = cluster.fork();
        worker.send(i);
      }
    })  
} else {
  process.on('message', async (id) => {
    if (id === 1) {
      console.log(`Worker ${process.pid} started`);
      await seedAttractions()
      process.exit();
    } 
    if (id === 2) {
      console.log(`Worker ${process.pid} started`);
      await seedQuestions()
      process.exit();
    } 
    if (id === 3) {
      console.log(`Worker ${process.pid} started`);
      await seedAnswers() 
      process.exit();
    } 
  })  
}



// function getTime() {
//   let data = new Date()
//   let hour = data.getHours()
//   let minute = data.getMinutes()
//   let second = data.getSeconds()
//   console.log(hour+':'+minute+':'+second)
// }

// const csAt = new pgp.helpers.ColumnSet(['id'], { table: 'attractions'})
// const csQ = new pgp.helpers.ColumnSet(['id', 'attraction_id', 'username', 'firstname', 'lastname', 'date', 'flag', 'avatar', 'questiontext'], { table: 'questions'});
// const csA = new pgp.helpers.ColumnSet(['id', 'question_id', 'firstname', 'lastname', 'flag', 'answertext'], { table: 'answers'});
// const size = 3;
// const size2 = 6;
// db.tx((t) => {
//   return t.batch([
//     db.task(async () => {
//       await makeReady()
//       getTime()
//       await db.tx('massive-insert', (t) => {
//         return t.sequence((index) => {
//           console.log('inserting the ', index*10000, ' data to attractions table')
//           return fakeData.generateAttractions(t, index, size)
//             .then((data) => {
//               if (data.length === 0) {
//                 return;
//               }
//               if (data) {
//                 const insert = pgp.helpers.insert(data, csAt);
//                 return dbivy.none(insert);
//               }
//             })
//             .catch((error) => {
//               getTime()
//               console.log('can not insert data to attractions table', error)
//             })
//         });
//       })
//       await db.tx('massive-insert', (t) => {
//         return t.sequence((index) => {
//           console.log('inserting the ', index*10000, ' data to questions table')
//           return fakeData.generateQuestions(t, index, size)
//             .then((data) => {
//               if (data.length === 0) {
//                 return;
//               }
//               if (data) {
//                 const insert = pgp.helpers.insert(data, csQ);
//                 return dbivy.none(insert);
//               }
//             })
//             .catch((error) => {
//               getTime()
//               console.log('can not insert data to questions table', error)
//             })
//         });
//       })
//       await db.tx('massive-insert', (t) => {
//         return t.sequence((index) => {
//           console.log('inserting the ', index*10000, ' data to answers table')
//           return fakeData.generateAnswers(t, index, size2, size)
//             .then((data) => {
//               if (data.length === 0) {
//                 return;
//               }
//               if (data) {
//                 const insert = pgp.helpers.insert(data, csA);
//                 return dbivy.none(insert);
//               }
//             })
//             .catch((error) => {
//               getTime()
//               console.log('can not insert data to answers table', error)
//             })
//         });
//       })
//     }),
//   ]);
// })
//   .then(async () => {
//     console.log('start making indexes');
//     await dbivy.none('CREATE INDEX index_attractions ON attractions(id)');
//     await dbivy.none('CREATE INDEX index_attraction ON questions(attraction_id)');
//     await dbivy.none('CREATE INDEX index_question_id ON answers(question_id)');
//     getTime() 
//   })
//   .catch((error) => {
//     console.log('something went wrong', error)
//   });


