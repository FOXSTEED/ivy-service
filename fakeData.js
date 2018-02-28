const faker = require('faker');

function getRandomNumBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + min));
}

function generateAnswers() {
  const answers = [];

  for (let i = 0; i <= getRandomNumBetween(1, 10); i += 1) {
    const answer = {};

    answer.answerNumber = i;
    answer.firstName = faker.name.firstName();
    answer.lastName = faker.name.lastName();
    answer.flag = faker.random.boolean();
    answer.upvotes = getRandomNumBetween(0, 12);
    answer.downvotes = getRandomNumBetween(0, 7);
    answer.answerText = faker.lorem.paragraph();

    answers.push(answer);
  }

  return answers;
}

function generateQuestions() {
  const questions = [];

  for (let i = 0; i <= getRandomNumBetween(1, 30); i += 1) {
    const question = {};

    question.questionNumber = i;
    question.username = faker.internet.userName();
    question.firstName = faker.name.firstName();
    question.lastName = faker.name.lastName();
    question.date = faker.date.past();
    question.flag = faker.random.boolean();
    question.avatar = faker.image.avatar();
    question.questionText = faker.lorem.paragraph();
    question.answers = generateAnswers();

    questions.push(question);
  }

  return questions;
}

function generateAttractions() {
  const attractions = [];

  for (let i = 0; i < 200; i += 1) {
    const attraction = {};

    attraction.id = i;
    attraction.questions = generateQuestions();

    attractions.push(attraction);
  }

  return attractions;
}

const attractionsData = generateAttractions();
module.exports = attractionsData;

