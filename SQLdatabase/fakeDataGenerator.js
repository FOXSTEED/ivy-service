const faker = require('faker');
const pgp = require('pg-promise')();


function getRandomNumBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + min));
}

function generateAnswers(t, index, size) {
  const answers = [];
  if (index < 800) { //800
    for (let i = index*size; i < index*size + size; i += 1) {
      const answer = {};
      answer.id = i;
      answer.question_id = getRandomNumBetween(0, 4000000); //4000000
      answer.firstname = faker.name.firstName();
      answer.lastname = faker.name.lastName();
      answer.flag = faker.random.boolean();
      answer.upvotes = getRandomNumBetween(0, 12);
      answer.downvotes = getRandomNumBetween(0, 7);
      answer.answertext = faker.lorem.paragraph();

      answers.push(answer);
    }
}
  return Promise.resolve(answers);
}

function generateQuestions(t, index, size) {
  let questions = [];
  if (index < 400) { //400
    for (let i = index*size; i < index*size + size; i += 1) {
      let question = {};
      question.id = i;
      question.trip = getRandomNumBetween(0, 100000);
      question.username = faker.internet.userName();
      question.firstname = faker.name.firstName();
      question.lastname = faker.name.lastName();
      question.date = faker.date.past();
      question.flag = faker.random.boolean();
      question.avatar = faker.image.avatar();
      question.questiontext = faker.lorem.paragraph();
      questions.push(question);
    }
  }
  return Promise.resolve(questions);
}

exports.generateQuestions = generateQuestions;
exports.generateAnswers = generateAnswers;

