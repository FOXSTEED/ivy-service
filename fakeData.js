var faker = require('faker');
fakeData = [];

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

for (let listingId = 0; listingId < 200; listingId++){
    listingQuestionsAndAnswers = {}

    listingQuestionsAndAnswers.id = listingId;
    listingQuestionsAndAnswers.questions = [];

    for (let i = 0; i < 2; i++){
        let question = {};

        question.questionNumber = i;
        question.username = faker.internet.userName();
        question.firstName = faker.name.firstName();
        question.lastName = faker.name.lastName();
        question.date = faker.date.past()
        question.flag = faker.random.boolean();
        question.avatar = faker.image.avatar();
        question.question = faker.lorem.paragraph();
        question.answers = [];

        for (let j = 0; j < 5; j++){
            let answer = {};

            answer.answerNumber = j;
            answer.firstName = faker.name.firstName();
            answer.lastName = faker.name.lastName();
            answer.flag = faker.random.boolean();
            answer.upvotes = getRandomNum(0, 12);
            answer.downvotes = getRandomNum(0, 7);
            answer.answer = faker.lorem.paragraph();

            question.answers.push(answer);
        }
        listingQuestionsAndAnswers.questions.push(question);
    }
    fakeData.push(listingQuestionsAndAnswers);
}


module.exports.fakeData = fakeData;