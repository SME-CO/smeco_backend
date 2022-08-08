'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifiedCustomerNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VerifiedCustomerNumbers.init({
    merchant_id: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    otp : DataTypes.STRING,
    timestamp: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'VerifiedCustomerNumbers',
  });
  return VerifiedCustomerNumbers;
};