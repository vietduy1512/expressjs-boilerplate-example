var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},   // with built-in validators
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},  // same as below
    date_of_death: Date
  }
);

// Virtual for author's full name (aka Getter - Using Author.name)
AuthorSchema
.virtual('name')
.get(function () {

// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  return `${this.date_of_birth_formatted} - ${this.date_of_death_formatted}`;
});

AuthorSchema
.virtual('url')
.get(function () {
  return '/authors/' + this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return moment(this.date_of_death).format('YYYY-MM-DD');
});

module.exports = mongoose.model('Author', AuthorSchema);