'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Purchase.init({
    customerId: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER,
    customerName: DataTypes.STRING,
    merchantName: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
    totalAmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};