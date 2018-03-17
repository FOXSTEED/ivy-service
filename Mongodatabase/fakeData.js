const faker = require('faker');

function getRandomNumBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + min));
}

function generateAnswers() {
  const answers = [];

  for (let i = 0; i <= getRandomNumBetween(1, 5); i += 1) {
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

function generateQuestions(n) {
  console.log('pass2')
  let questions = [];
  for (let i = n; i < n+10; i += 1) {
    let question = {};
    question.id = i;
    question.trip = getRandomNumBetween(0, 50000);
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
  return questions
}

exports.generateQuestions = generateQuestions;