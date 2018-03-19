const pgp = require('pg-promise')({
  capSQL: true
});

const dbivy = pgp({
  port: 5432,
  database: 'ivydatabase',
});

const getById = function getById(id, callback) {
  dbivy.any('SELECT * FROM questions WHERE trip= $1', [id])
    .then(async (data) => {
      const newData = await data.map(async (question) => {
        const questionId = question.id;
        return dbivy.any('SELECT * FROM answers WHERE question_id= $1', [questionId])
          .then((answers) => {
            question.answers = answers;
            return question
          })
      })
      console.log(newData)
      callback(null, newData)
    })
    .catch((err) =>  {
      callback(err, null)
    });
}

exports.getById = getById;