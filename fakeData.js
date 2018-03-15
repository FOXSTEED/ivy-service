const faker = require('faker');
// const fs = require('fs');
const database = require('./database/data.js');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/tripadviser');

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

// function generateQuestions() {
//   // const questions = [];

//   // for (let i = 0; i <= getRandomNumBetween(1, 30); i += 1) {
//   const question = {};
//   question.trip = getRandomNumBetween(0, 500000);
//   question.questionNumber = i;
//   question.username = faker.internet.userName();
//   question.firstName = faker.name.firstName();
//   question.lastName = faker.name.lastName();
//   question.date = faker.date.past();
//   question.flag = faker.random.boolean();
//   question.avatar = faker.image.avatar();
//   question.questionText = faker.lorem.paragraph();
//   question.answers = generateAnswers();

//   // questions.push(question);
//   // }

//   return question;
// }

async function generateAttractions() {
  let questions = [];
  for (let i = 0; i <= 10000000; i += 1) {
    if (i !== 0 && i % 50000 === 0) {
      await database.addToDb(questions)
      console.log('inserted '+ i/50000)
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



// function generateAttractions() {
//   let attractions = [];
//   for (let i = 0; i < 1000000; i += 1) {
//     if(i%50000===0) {
//       fs.writeFile('data.txt', JSON.stringify(attractionsData), (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//       });
//       console.log('wrote '+ i/50000+" data")
//     }；
//     const attraction = {};
//     attraction.id = i;
//     attraction.questions = generateQuestions();
//     attractions.push(attraction);
//   }
//   return attractions;
// }

const attractionsData = generateAttractions();
module.exports = attractionsData;

