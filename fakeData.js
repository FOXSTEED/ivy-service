var faker = require('faker');
fakeData = [];

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
            answer.upvotes = faker.random.number();
            answer.downvotes = faker.random.number();

            question.answers.push(answer);
        }
        listingQuestionsAndAnswers.questions.push(question);
    }
    fakeData.push(listingQuestionsAndAnswers);
}


module.exports.fakeData = fakeData;