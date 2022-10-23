'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BundleOfferProductSet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BundleOfferProductSet.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    bundleOfferId: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BundleOfferProductSet',
  });
  return BundleOfferProductSet;
};