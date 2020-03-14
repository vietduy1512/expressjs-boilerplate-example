var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

const RoleTypes = Object.freeze({
  USER: 'User',
  ADMIN: 'Admin'
});

const UserProperties = Object.freeze({
  PASSWORD: 'Password'
});

var userSchema = new Schema(
  {
    email: { type: String, unique: true, trim: true, required: true, max: 60 },
    password: { type: String, required: true, max: 32, min: 6 },
    fullname: { type: String, required: true, max: 80 },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      enum: [RoleTypes.USER, RoleTypes.ADMIN],
      default: RoleTypes.USER
    }
  }
);

userSchema
    .virtual('url')
    .get(() => {
        return '/users/' + this._id;
    });

userSchema
    .virtual('isAdmin')
    .get(() => {
        return this.role === RoleTypes.ADMIN;
    });

userSchema
    .virtual('isUser')
    .get(() => {
        return this.role === RoleTypes.USER;
    });

userSchema.pre('save', (next) => {
    var user = this;
    if (user.isModified(UserProperties.PASSWORD)) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        })
      })
    } else {
      next();
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    let user = await this.findOne({ email });
    if (!user) {
      return null;
    }

    return await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      })
    })
}

userSchema.statics.register = (user) => {
    var User = this;
    return User.findOne({ email: user.email }).then(data => {
        if (data === null) {
            return user.save();
        }
        return Promise.reject("Email has already registered.");
    })
}

module.exports = mongoose.model(RoleTypes.USER, userSchema);