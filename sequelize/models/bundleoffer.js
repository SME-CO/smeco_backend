'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BundleOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BundleOffer.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    offerId: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER,
    image : DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'BundleOffer',
  });
  return BundleOffer;
};