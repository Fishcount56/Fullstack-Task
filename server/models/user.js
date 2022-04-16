'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.transaction, {
        as : "users",
        foreignKey : {
          name: 'idUser'
        }
      }),
      user.hasMany(models.userbook, {
        as : "UserOwner",
        foreignKey : {
          name: 'idUser'
        }
      }),
      user.hasOne(models.userprofile, {
        as : "ProfileUser",
        foreignKey: {
          name: 'idUser'
        }
      })
    }
  }
  user.init({
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};