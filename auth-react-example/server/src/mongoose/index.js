const mongoose = require('mongoose');
const constants = require('./db.constants');

mongoose.set('useCreateIndex', true);
mongoose.connect(constants.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose.connection;
