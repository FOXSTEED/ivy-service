
function getRandomNum(userContext, events, done) {
  const id = Math.floor(Math.random() * 10000000);
  userContext.vars.id = id;
  return done();
}

module.exports.getRandomNum = getRandomNum;