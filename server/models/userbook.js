'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userbook.belongsTo(models.user, {
        as : "UserOwner",
        foreignKey: {
          name: 'idUser'
        }
      })
      userbook.belongsTo(models.book, {
        as : "BookOwned",
        foreignKey: {
          name: 'idBook'
        }
      })
    }
  }
  userbook.init({
    idUser: DataTypes.INTEGER,
    idBook: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userbook',
  });
  return userbook;
};