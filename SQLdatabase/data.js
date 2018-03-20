const pgp = require('pg-promise')({
  capSQL: true
});

const dbivy = pgp({
  port: 5432,
  database: 'ivydatabase',
});

const getById = function getById(id, callback) {
  dbivy.any('SELECT * FROM attractions WHERE id= $1', [id])
    .then(async (attraction) => {
      await dbivy.any('SELECT * FROM questions WHERE attraction_id= $1', [attraction[0].id])
        .then(async (questions) => {
          let arr = []
          questions.forEach(async (question) => {
            await dbivy.any('SELECT * FROM answers WHERE question_id= $1', [question.id])
              .then((answers) => {
                question.answers = answers;
                arr.push(question);
              })
              .then(() => {
                callback(null, arr);
              })
              .catch((err) =>  {
                callback(err, null);
              });
          });
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