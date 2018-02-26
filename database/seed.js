const fakeData = require('../fakeData.js');
const mongoose = require('mongoose');
const database = require('./data.js');

(function seedDb(attractions) {
  attractions.forEach((attraction) => {
    database.addToDb(attraction, (err, data) => {
      if (err) {
        console.log(err);
      }
      // console.log(data);
    });
  });
}(fakeData));

// database.getAll((err, data) => {
//   if (err) {
//     console.log('error from seedDB');
//   }
//   console.log(data);
// });