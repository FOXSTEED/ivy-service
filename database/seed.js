const fakeData = require('../fakeData.js');
const database = require('./data.js');


database.addToDb(fakeData);

// function seedDb(attractions) {
//   database.addToDb(attractions, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     // console.log(data);
//   });
// }
// seedDb(fakeData);

// database.removeAll((err, data) => {
//   if (err){
//     console.log('error removing');
//   }
// });

// database.getAll((err, data) => {
//   if (err) {
//     console.log('error from seedDB');
//   }
//   console.log(data);
// });
