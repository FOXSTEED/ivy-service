const faker = require('faker');
const pgp = require('pg-promise')();


function getRandomNumBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + min));
}

function generateAttractions(t, index, size) {
  const attractions = [];
  if (index < 1000) { //1000
    for (let i = index*size+1; i < index*size+1+ size; i += 1) {
      const attraction = {};
      attraction.id = i;
      attractions.push(attraction);
    }
}
  return Promise.resolve(attractions);
}

function generateQuestions(t, index, size) {
  const questions = [];
  if (index < 1000) { //1000
    for (let i = index*size+1; i < index*size+1+size; i += 1) {
      let question = {};
      question.id = i;
      question.attraction_id = i;
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

function generateAnswers(t, index, size) {
  const answers = [];
  if (index < 1000) { //1000
    for (let i = index*size+1; i < index*size+1 + size; i += 1) {
      const answer = {};
      answer.id = i;
      // answer.question_id = getRandomNumBetween(0, 10000000);
      answer.question_id = i;
      answer.firstname = faker.name.firstName();
      answer.lastname = faker.name.lastName();
      answer.flag = faker.random.boolean();
      answer.answertext = faker.lorem.paragraph();

      answers.push(answer);
    }
}
  return Promise.resolve(answers);
}



exports.generateQuestions = generateQuestions;
exports.generateAnswers = generateAnswers;
exports.generateAttractions = generateAttractions;
