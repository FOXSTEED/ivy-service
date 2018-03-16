const faker = require('faker');
const database = require('./data.js');



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

async function generateAttractions() {
  let questions = [];
  for (let i = 0; i <= 10; i += 1) {
    if (i !== 0 && i % 5 === 0) {
      await database.addToDb(questions)
      console.log('inserted '+ i/5)
      questions = [];
    }
    
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

  mongoose.connection.close()
}



const attractionsData = generateAttractions();
module.exports = attractionsData;

