const pgp = require('pg-promise')({
  capSQL: true
});

const dbivy = pgp({
  port: 5432,
  database: 'ivydatabase',
});

const getById = function getById(id, callback) {
  console.log('dataside')
  console.time()
  dbivy.any('SELECT * FROM attractions WHERE id= $1', [id])
    .then(async (attraction) => {
      await dbivy.any('SELECT * FROM questions WHERE attraction_id= $1', [attraction[0].id])
        .then(async (questions) => {
          const arr = []
          for (let i = 0; i < questions.length; i += 1) {
            const answers = await dbivy.any('SELECT * FROM answers WHERE question_id= $1', [questions[i].id])
            questions[i].answers = answers;
            arr.push(questions[i])
          }
          console.timeEnd()
          callback(null, arr)
        })
        .catch((err) =>  {
          console.log('can not get questions')
        });
    })
    .catch((err) =>  {
      console.log('can not get attractions')
    });
};

exports.getById = getById;