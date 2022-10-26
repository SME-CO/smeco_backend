'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PurchaseProduct.init({
    purchaseId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    merchantName: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PurchaseProduct',
  });
  return PurchaseProduct;
};