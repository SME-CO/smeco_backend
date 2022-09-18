'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product.belongsTo(models.Merchant, { foreignKey: 'merchantId', as: 'merchant' })
    }
  }
  Product.init({
    productName: DataTypes.STRING,
    merchantId: DataTypes.INTEGER,
    shopName: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    offers: DataTypes.STRING,
    description: DataTypes.STRING,
    isDiscount: DataTypes.BOOLEAN,
    discountPercentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};