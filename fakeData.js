const faker = require('faker');
let attractions = [];

function getRandomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

for (let attraction = 0; attraction < 200; attraction++){
    let attractionQuestionsAndAnswers = {};

    attractionQuestionsAndAnswers.id = attraction;
    attractionQuestionsAndAnswers.questions = [];

    for (let i = 0; i < getRandomNumBetween(1, 30); i++){
        let question = {};

        question.questionNumber = i;
        question.username = faker.internet.userName();
        question.firstName = faker.name.firstName();
        question.lastName = faker.name.lastName();
        question.date = faker.date.past();
        question.flag = faker.random.boolean();
        question.avatar = faker.image.avatar();
        question.question = faker.lorem.paragraph();
        question.answers = [];

        for (let j = 0; j < getRandomNumBetween(1, 10); j++){
            let answer = {};

            answer.answerNumber = j;
            answer.firstName = faker.name.firstName();
            answer.lastName = faker.name.lastName();
            answer.flag = faker.random.boolean();
            answer.upvotes = getRandomNumBetween(0, 12);
            answer.downvotes = getRandomNumBetween(0, 7);
            answer.answer = faker.lorem.paragraph();

            question.answers.push(answer);
        }
        attractionQuestionsAndAnswers.questions.push(question);
    }
    attractions.push(attractionQuestionsAndAnswers);
}


module.exports = attractions;