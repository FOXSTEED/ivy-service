const faker = require('faker');
let attractions = [];

function getRandomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

for (let i = 0; i < 200; i++){
    let attraction = {};

    attraction.id = i;
    attraction.questions = [];

    for (let j = 0; j < getRandomNumBetween(1, 30); j++){
        let question = {};

        question.questionNumber = j;
        question.username = faker.internet.userName();
        question.firstName = faker.name.firstName();
        question.lastName = faker.name.lastName();
        question.date = faker.date.past();
        question.flag = faker.random.boolean();
        question.avatar = faker.image.avatar();
        question.question = faker.lorem.paragraph();
        question.answers = [];

        for (let k = 0; k < getRandomNumBetween(1, 10); k++){
            let answer = {};

            answer.answerNumber = k;
            answer.firstName = faker.name.firstName();
            answer.lastName = faker.name.lastName();
            answer.flag = faker.random.boolean();
            answer.upvotes = getRandomNumBetween(0, 12);
            answer.downvotes = getRandomNumBetween(0, 7);
            answer.answer = faker.lorem.paragraph();

            question.answers.push(answer);
        }
        attraction.questions.push(question);
    }
    attractions.push(attraction);
}


module.exports = attractions;