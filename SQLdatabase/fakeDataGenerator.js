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

function generateQuestions(t, index, size, attractionsize) {
  const questions = [];
  let count = index* attractionsize+1
  let changeCount = false
  if (index < 1000) { //1000
    for (let i = index*size+1; i < index*size+1+size; i += 1) {
      let question = {};
      question.id = i;
      question.attraction_id = count;
      question.username = faker.internet.userName();
      question.firstname = faker.name.firstName();
      question.lastname = faker.name.lastName();
      question.date = faker.date.past();
      question.flag = faker.random.boolean();
      question.avatar = faker.image.avatar();
      question.questiontext = faker.lorem.paragraph();
      questions.push(question);
      if (changeCount) {
        count += 1
      } 
      changeCount = !changeCount
    }
    }
  return Promise.resolve(questions);
}

function generateAnswers(t, index, size) {
  const answers = [];
  // let count = index*questionsize+1
  // let changeCount = false
  if (index < 1000) { //1000
    for (let i = index*size+1; i < index*size+1 + size; i += 1) {
      const answer = {};
      answer.id = i;
      // answer.question_id = getRandomNumBetween(0, 10000000);
      answer.question_id = i
      answer.firstname = faker.name.firstName();
      answer.lastname = faker.name.lastName();
      answer.flag = faker.random.boolean();
      answer.answertext = faker.lorem.paragraph();

      answers.push(answer);
    //   if (changeCount) {
    //     count += 1
    //   } 
    //   changeCount = !changeCount
    }
}
  return Promise.resolve(answers);
}



exports.generateQuestions = generateQuestions;
exports.generateAnswers = generateAnswers;
exports.generateAttractions = generateAttractions;
