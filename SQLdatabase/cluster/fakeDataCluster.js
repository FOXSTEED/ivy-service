const faker = require('faker');

function getRandomNumBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + min));
}

function generateAnswers(n, size, id, base) {
  const answers = [];
  for (let i = n; i < n+size; i += 1) {
    const answer = {};
    answer.id = i;
    answer.question_id = getRandomNumBetween(id*base, id*base+base-1);
    answer.firstname = faker.name.firstName();
    answer.lastname = faker.name.lastName();
    answer.flag = faker.random.boolean();
    answer.upvotes = getRandomNumBetween(0, 12);
    answer.downvotes = getRandomNumBetween(0, 7);
    answer.answertext = faker.lorem.paragraph();

    answers.push(answer);
  }

  return answers;
}

function generateQuestions(n, size) {
  let questions = [];
  for (let i = n; i < n+size; i += 1) {
    let question = {};
    question.id = i;
    question.trip = getRandomNumBetween(0, 20000); 
    question.username = faker.internet.userName();
    question.firstname = faker.name.firstName();
    question.lastname = faker.name.lastName();
    question.date = faker.date.past();
    question.flag = faker.random.boolean();
    question.avatar = faker.image.avatar();
    question.questiontext = faker.lorem.paragraph();
    // question.answers = generateAnswers();
    questions.push(question);
  }
  return questions;
}

exports.generateQuestions = generateQuestions;
exports.generateAnswers = generateAnswers;

