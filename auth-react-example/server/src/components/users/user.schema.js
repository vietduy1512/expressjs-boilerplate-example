var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

const RoleTypes = Object.freeze({
  User: 'User',
  Admin: 'Admin'
});

const UserProperties = Object.freeze({
  Password: 'Password'
});

var UserSchema = new Schema(
  {
    Email: { type: String, unique: true, trim: true, required: true, max: 60 },
    Password: { type: String, required: true, max: 32, min: 6 },
    Fullname: { type: String, required: true, max: 80 },
    IsActive: { type: Boolean, default: true },
    Role: {
      type: String,
      enum: [RoleTypes.User, RoleTypes.Admin],
      default: RoleTypes.User
    }
  }
);

UserSchema
    .virtual('url')
    .get(() => {
        return '/users/' + this._id;
    });

UserSchema
    .virtual('IsAdmin')
    .get(() => {
        return this.Role === RoleTypes.Admin;
    });

UserSchema
    .virtual('IsUser')
    .get(() => {
        return this.Role === RoleTypes.User;
    });

UserSchema.pre('save', (next) => {
    var user = this;
    if (user.isModified(UserProperties.Password)) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.Password, salt, (err, hash) => {
          user.Password = hash;
          next();
        })
      })
    } else {
      next();
    }
})

UserSchema.statics.findByCredentials = async (Email, password) => {
    let user = await this.findOne({ Email });
    if (!user) {
      return null;
    }

    return await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.Password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      })
    })
}

UserSchema.statics.register = (user) => {
    var User = this;
    return User.findOne({ Email: user.Email }).then(data => {
        if (data === null) {
            return user.save();
        }
        return Promise.reject("Email has already registered.");
    })
}

module.exports = mongoose.model(RoleTypes.User, UserSchema);