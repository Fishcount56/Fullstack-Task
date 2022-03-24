'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as : "User",
        foreignKey : {
          name: 'idUser'
        }
      })
    }
  }
  transaction.init({
    idUser: DataTypes.STRING,
    transferProof: DataTypes.STRING,
    approveDate: DataTypes.DATEONLY,
    overDate: DataTypes.DATEONLY,
    userStatus: DataTypes.STRING,
    remainActive: DataTypes.STRING,
    paymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};