const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const RoleTypes = Object.freeze({
  USER: 'User',
  ADMIN: 'Admin'
});

let userSchema = new Schema(
  {
    email: { type: String, unique: true, trim: true, required: true, max: 60 },
    password: { type: String, required: true, max: 32, min: 6 },
    fullname: { type: String, required: false, default:'', max: 80 },
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

userSchema.pre('save', function(next) {
    let user = this;
    if (user.password) {
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

userSchema.methods = {
  checkPassword: (inputPassword) => {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

userSchema.statics = {
  findByCredentials: async function(email, password) {
    let user = await this.findOne({ email });
    if (!user) {
      return null;
    }
    return await bcrypt.compare(password, user.password);
  },
  register: function(user) {
    return this.findOne({ email: user.email }).then(data => {
        if (data === null) {
          return user.save();
        }
        return Promise.reject("Email has already registered.");
    })
  }
}



module.exports = mongoose.model(RoleTypes.USER, userSchema);