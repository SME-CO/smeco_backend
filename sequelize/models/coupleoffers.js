'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoupleOffers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoupleOffers.init({
    product1: DataTypes.INTEGER,
    product2: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER,
    offerId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CoupleOffers',
  });
  return CoupleOffers;
};