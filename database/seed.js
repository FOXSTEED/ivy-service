const fakeData = require('../fakeData.js');
const database = require('./data.js');

for(let i = 0; i < 10; i += 1){
  database.addToDb(fakeData);
  console.log('testing')
}

