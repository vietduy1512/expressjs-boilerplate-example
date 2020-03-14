const mongoose = require('mongoose');
const constants = require('./db.constants');

module.exports = () => {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(constants.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
