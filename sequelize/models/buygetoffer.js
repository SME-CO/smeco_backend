'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuyGetOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BuyGetOffer.init({
    name: DataTypes.STRING,
    buyQuantity: DataTypes.INTEGER,
    getQuantity: DataTypes.INTEGER,
    merchantID: DataTypes.INTEGER,
    offerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productName : DataTypes.STRING,
    image : DataTypes.STRING,
    price : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BuyGetOffer',
  });
  return BuyGetOffer;
};