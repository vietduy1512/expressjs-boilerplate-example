const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');
const bcrypt = require('bcryptjs');

const RoleTypes = Object.freeze({
  USER: 'User',
  ADMIN: 'Admin'
});

class User extends Model {

  static register(user) {
    return this.findOne({where: { email: user.email }}).then(data => {
        if (data === null) {
          return user.save();
        }
        return Promise.reject("Email has already registered.");
    })
  }
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  }
  hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10)
  }

  get url() {
    return '/users/' + this._id;
  }
  get isAdmin() {
    return this.role === RoleTypes.ADMIN;
  }
  get isUser() {
    return this.role === RoleTypes.USER;
  }
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, trim: true,
    validate: {
      len: [4,64]
    }
  },
  password: { type: DataTypes.STRING, allowNull: false,
    validate: {
      len: [4,32]
    }
  },
  fullname: { type: DataTypes.STRING, defaultValue:'',
    validate: {
      len: [0,32]
    }
  },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  role: {
    type: DataTypes.ENUM(RoleTypes.USER, RoleTypes.ADMIN),
    defaultValue: RoleTypes.USER
  }
}, {
  sequelize,
  modelName: 'user'
});

User.beforeCreate(async (user) => {
  if (user.password) {
    let salt = await bcrypt.genSalt(10); 
    let hashedPasword = await bcrypt.hash(user.password, salt);
    user.password = hashedPasword;
  } else {
    return Promise.reject(new Error("No password!"));
  }
});

module.exports = User;