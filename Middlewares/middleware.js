const middlewares = (req, res, next) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  console.log("Api is calling on time ", currentDate);
  next();
};

module.exports = middlewares;
