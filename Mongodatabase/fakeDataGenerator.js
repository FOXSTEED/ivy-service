const faker = require('faker');

function getRandomNumBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + min));
}

function generateAnswers() {
  // const answers = [];

  // for (let i = 0; i < 2; i += 1) {
  const answer = {};

  // answer.answernumber = i;
  answer.firstname = faker.name.firstName();
  answer.lastname = faker.name.lastName();
  answer.flag = faker.random.boolean();
  // answer.upvotes = getRandomNumBetween(0, 12);
  // answer.downvotes = getRandomNumBetween(0, 7);
  answer.answertext = faker.lorem.paragraph();

//   answers.push(answer);
  // }

  // return answers;
  return answer
}

function generateQuestions(n, size) {
  // let questions = [];
  // for (let i = n; i < n+size; i += 1) {
  let question = {};
  question.username = faker.internet.userName();
  question.firstname = faker.name.firstName();
  question.lastname = faker.name.lastName();
  question.date = faker.date.past();
  question.flag = faker.random.boolean();
  question.avatar = faker.image.avatar();
  question.questiontext = faker.lorem.paragraph();
  question.answers = [generateAnswers()];

  //   questions.push(question);
  // }
  // return questions
  return question
}

function generateAttractions(n, size) {
  let attractions = [];
  for (let i = n; i < n+size; i += 1) {
    let attraction = {}
    attraction.id = i;
    attraction.questions = [generateQuestions(), generateQuestions()]
    attractions.push(attraction)
  }
  return attractions;
}
exports.generateAttractions = generateAttractions;